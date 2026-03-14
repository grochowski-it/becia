<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { $fetch } from 'ofetch'
import { useOrderStore } from '~/stores/order'

defineProps<{
  title: string
  text: string
  icon: string
  badge: string
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  buttonText: string
  infoText: string
}>()

const form = ref({
  name: '',
  email: '',
  message: '',
  turnstileToken: ''
})
const pending = ref(false)
const successMsg = ref('')
const errorMsg = ref('')
const turnstileRef = ref()

const orderStore = useOrderStore()

onMounted(() => {
  if (orderStore.orderMessage) {
    form.value.message = orderStore.orderMessage
  }
})

watch(() => orderStore.orderMessage, (newVal) => {
  if (newVal) {
    form.value.message = newVal
  }
})

const submitForm = async () => {
  pending.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    if (!form.value.turnstileToken) {
      errorMsg.value = 'Proszę zaznaczyć, że nie jesteś robotem.'
      pending.value = false
      return
    }

    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    successMsg.value = response.message || 'Wiadomość wysłana!'
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
    form.value.turnstileToken = ''
    orderStore.clearOrderMessage()
  } catch (error: any) {
    errorMsg.value = error.data?.statusMessage || 'Wystąpił błąd. Spróbuj ponownie później.'
  } finally {
    pending.value = false
    // Zawsze resetujemy turnstile po zakończeniu (sukces lub błąd) by token nie wygasł/nie został użyty ponownie
    if (turnstileRef.value) {
      turnstileRef.value.reset()
      form.value.turnstileToken = ''
    }
  }
}
</script>

<template>
  <section id="contact" class="p-4 bg-primary/10 py-12 md:py-20">
    <div class="max-w-xl mx-auto">
      <div class="text-center mb-8">
        <div class="inline-block p-3 bg-white dark:bg-slate-800 rounded-full mb-4 shadow-sm">
          <span class="material-symbols-outlined text-leather text-4xl">{{ icon }}</span>
        </div>
        <div>
           <h2 class="text-leather dark:text-primary text-2xl font-black mb-2 mt-0">{{ title }}</h2>
           <p class="text-stitch-brown dark:text-slate-300 m-0">{{ text }}</p>
        </div>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-2 border-leather/10 relative">
        <div class="!absolute -top-3 -right-3 leather-patch h-10 w-24 rounded flex items-center justify-center text-xs text-white font-bold rotate-12">
          {{ badge }}
        </div>

        <div>
          <label class="block text-sm font-bold text-leather mb-1">{{ nameLabel }}</label>
          <input v-model="form.name" required type="text" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" :placeholder="namePlaceholder">
        </div>

        <div>
          <label class="block text-sm font-bold text-leather mb-1">{{ emailLabel }}</label>
          <input v-model="form.email" required type="email" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" :placeholder="emailPlaceholder">
        </div>

        <div>
          <label class="block text-sm font-bold text-leather mb-1">{{ messageLabel }}</label>
          <textarea v-model="form.message" required rows="4" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" :placeholder="messagePlaceholder"></textarea>
        </div>

        <!-- Cloudflare Turnstile -->
        <div class="flex justify-center my-4">
          <NuxtTurnstile ref="turnstileRef" v-model="form.turnstileToken" />
        </div>

        <!-- Messages -->
        <div v-if="successMsg" class="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{{ successMsg }}</div>
        <div v-if="errorMsg" class="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{{ errorMsg }}</div>

        <button :disabled="pending" type="submit" class="leather-patch w-full py-4 text-white font-black text-lg rounded-lg shadow-xl hover:opacity-90 transition-opacity disabled:opacity-50">
          {{ pending ? 'Wysyłanie...' : buttonText }}
        </button>
        <p class="text-center text-[10px] text-slate-400 mt-4 italic">
          {{ infoText }}
        </p>
      </form>
    </div>
  </section>
</template>