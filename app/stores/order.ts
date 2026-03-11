import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderMessage: ''
  }),
  actions: {
    setOrderMessage(message: string) {
      this.orderMessage = message
    },
    clearOrderMessage() {
      this.orderMessage = ''
    }
  }
})
