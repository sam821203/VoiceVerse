import { useModal } from './modules/modal/index.js'
import { useUser } from './modules/user/index.js'

export const useStore = () => {
  return {
    useModal,
    useUser
  }
}
