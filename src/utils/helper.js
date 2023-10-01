import { db, storage } from '@/utils/firebase'
import { getDocs, query, where, collection } from 'firebase/firestore'
import { ref } from 'firebase/storage'

export default {
  formatTime(time) {
    const minutes = Math.floor(time / 60) || 0
    const seconds = Math.round(time - minutes * 60) || 0

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  },
  formatUtcDate(timeString) {
    const inputDate = new Date(timeString)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ]

    const year = inputDate.getFullYear()
    const month = months[inputDate.getMonth()]
    const day = inputDate.getDate()

    return `${day} ${month} ${year}`
  },
  async getDocuments(docs, id, target) {
    const q = query(collection(db, docs), where(id, '==', target))
    const querySnapshot = await getDocs(q)

    return querySnapshot
  },
  getStorage(target) {
    return ref(storage, target)
  }
}
