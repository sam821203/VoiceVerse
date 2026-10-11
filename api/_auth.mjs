const FIREBASE_API_KEY = 'AIzaSyAQRo4Fr8Ip7LSk2lep8bpurQsBIJ3mIzY'

// 用 Firebase Auth REST API 驗證前端送來的 ID token，回傳使用者 uid
export async function verifyIdToken(idToken) {
  if (!idToken) return null

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken })
    }
  )

  if (!response.ok) return null

  const data = await response.json()
  return data.users && data.users[0] ? data.users[0].localId : null
}

export function getBearerToken(req) {
  const header = req.headers.authorization || ''
  return header.startsWith('Bearer ') ? header.slice(7) : null
}

// 只允許使用者操作自己資料夾底下的檔案
export function ownsPath(uid, pathname) {
  return ['songs', 'avatars'].some((folder) => pathname.startsWith(`${folder}/${uid}/`))
}
