// 把原本在 Firebase Storage 的檔案重新上傳到 Vercel Blob 的 legacy/ 底下
// 用法：BLOB_READ_WRITE_TOKEN=... node scripts/upload-legacy-media.mjs <資料夾>
// 資料夾內的檔名要和 Firebase Storage 上的物件名稱相同（音檔一律以 .mp3 結尾）
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { put } from '@vercel/blob'

const sourceDir = process.argv[2]

if (!sourceDir || !process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('Usage: BLOB_READ_WRITE_TOKEN=... node scripts/upload-legacy-media.mjs <dir>')
  process.exit(1)
}

for (const folder of ['songs', 'avatars']) {
  const dir = path.join(sourceDir, folder)
  const files = await readdir(dir).catch(() => [])

  for (const file of files) {
    const blob = await put(`legacy/${folder}/${file}`, await readFile(path.join(dir, file)), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true
    })
    console.log(blob.url)
  }
}
