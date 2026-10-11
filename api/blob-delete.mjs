import { del } from '@vercel/blob'
import { verifyIdToken, getBearerToken, ownsPath } from './_auth.mjs'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const uid = await verifyIdToken(getBearerToken(req))
  const { url } = req.body || {}

  let target
  try {
    target = new URL(url)
  } catch (error) {
    res.status(400).json({ error: 'Invalid url' })
    return
  }

  const pathname = decodeURIComponent(target.pathname.slice(1))

  if (
    !uid ||
    !target.hostname.endsWith('.public.blob.vercel-storage.com') ||
    !ownsPath(uid, pathname)
  ) {
    res.status(403).json({ error: 'Not authorized' })
    return
  }

  await del(url)
  res.status(200).json({ ok: true })
}
