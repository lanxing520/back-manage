import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userName: '用户名',
  }),
  actions: {
    changeUserName(name) {
      this.userName = name
    },
  },
})
