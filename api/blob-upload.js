import { handleUpload } from '@vercel/blob/client'
import { verifyIdToken, getBearerToken, ownsPath } from './_auth.js'

const MB = 1024 * 1024

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const uid = await verifyIdToken(getBearerToken(req))

        if (!uid || !ownsPath(uid, pathname)) {
          throw new Error('Not authorized')
        }

        const isSong = pathname.startsWith('songs/')

        return {
          allowedContentTypes: isSong ? ['audio/mpeg'] : ['image/jpeg', 'image/png'],
          maximumSizeInBytes: isSong ? 20 * MB : 5 * MB,
          addRandomSuffix: true
        }
      }
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
