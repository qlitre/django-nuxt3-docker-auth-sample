import { defineStore } from 'pinia'
import type { User } from '../types/account'

export const useUserStore = defineStore("user", () => {

  const user = ref<User>({})
  function setUser(usr: User) {
    user.value = usr
  }

  // Resetting State
  function $reset() {
    user.value = {}
  }

  return { user, setUser, $reset }
},
  {
    persist: {
      storage: persistedState.localStorage
    }
  }
)