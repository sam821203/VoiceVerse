import { useModal } from './modules/modal/index.js'
import { useUser } from './modules/user/index.js'
import { usePlayer } from './modules/player/index.js'

export const useStore = () => {
  return {
    useModal,
    useUser,
    usePlayer
  }
}
