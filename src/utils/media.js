import { upload } from '@vercel/blob/client'
import { auth } from '@/utils/firebase'

const FIREBASE_STORAGE_PREFIX =
  'https://firebasestorage.googleapis.com/v0/b/voice-verse.appspot.com/o/'

const authHeaders = async () => {
  const idToken = await auth.currentUser.getIdToken()
  return { Authorization: `Bearer ${idToken}` }
}

const MEDIA_STORE_URL = 'https://b9ioigfewilhvig8.public.blob.vercel-storage.com'

// 舊資料的網址指向已停用的 Firebase Storage，改指到搬到 Vercel Blob 的 legacy 備份檔
const resolveMediaUrl = (url) => {
  if (!url || !url.startsWith(FIREBASE_STORAGE_PREFIX)) return url

  let path = decodeURIComponent(url.slice(FIREBASE_STORAGE_PREFIX.length).split('?')[0])

  if (path.startsWith('songs/') && !path.endsWith('.mp3')) {
    path = `${path}.mp3`
  }

  return `${MEDIA_STORE_URL}/legacy/${encodeURI(path)}`
}

const isBlobUrl = (url) => {
  try {
    return new URL(url).hostname.endsWith('.public.blob.vercel-storage.com')
  } catch (error) {
    return false
  }
}

// folder 為 'songs' 或 'avatars'，檔案會存到 folder/uid/ 底下
const uploadMedia = async (folder, file, options = {}) => {
  const pathname = `${folder}/${auth.currentUser.uid}/${file.name}`

  return upload(pathname, file, {
    access: 'public',
    handleUploadUrl: '/api/blob-upload',
    headers: await authHeaders(),
    contentType: file.type,
    abortSignal: options.abortSignal,
    onUploadProgress: options.onUploadProgress
  })
}

const deleteMedia = async (url) => {
  if (!isBlobUrl(url)) return

  const response = await fetch('/api/blob-delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
    body: JSON.stringify({ url })
  })

  if (!response.ok) throw new Error('Delete failed')
}

export { resolveMediaUrl, uploadMedia, deleteMedia }
