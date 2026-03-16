import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orderMessage: '',
    orderTopic: 'Zapytanie' // Domyślny temat
  }),
  actions: {
    setOrderMessage(message: string) {
      this.orderMessage = message
    },
    setOrderTopic(topic: string) {
      this.orderTopic = topic
    },
    clearOrderMessage() {
      this.orderMessage = ''
      this.orderTopic = 'Zapytanie'
    }
  }
})
