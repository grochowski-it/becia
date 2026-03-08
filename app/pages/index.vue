<script setup lang="ts">
import { ref } from 'vue'

const { data: statusData } = await useAsyncData('status', () => queryCollection('status').first())

const form = ref({
  name: '',
  email: '',
  message: ''
})
const pending = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const submitForm = async () => {
  pending.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })

    successMsg.value = response.message || 'Wiadomość wysłana!'
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
  } catch (error: any) {
    errorMsg.value = error.data?.statusMessage || 'Wystąpił błąd. Spróbuj ponownie później.'
  } finally {
    pending.value = false
  }
}

// SEO
useHead({
  title: 'Mięciutkie szydełkowanie ~by @Becia',
  meta: [
    { name: 'description', content: 'Mięciutkie szydełkowanie - ręcznie robione z miłością. Pluszaki, kwiaty i lalki amigurumi.' },
    { name: 'geo.region', content: 'PL-10' },
    { name: 'geo.placename', content: 'Zgierz, Łódź' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Mięciutkie szydełkowanie by Becia',
        description: 'Ręcznie robione szydełkowe pluszaki i maskotki',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Zgierz',
          addressRegion: 'Łódzkie',
          addressCountry: 'PL'
        }
      })
    }
  ]
})
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
    <header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-center sticky top-0 z-50 border-b border-primary/20">
      <div class="flex items-center justify-between w-full max-w-7xl">
        <div class="flex size-12 shrink-0 items-center">
          <div class="bg-primary/20 rounded-full p-1 border border-leather/30">
            <span class="material-symbols-outlined text-leather text-3xl">face_6</span>
          </div>
        </div>

        <h2 class="text-leather dark:text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">Mięciutkie szydełkowanie</h2>

        <div class="flex w-12 items-center justify-end md:hidden">
          <button class="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-leather">
            <span class="material-symbols-outlined">share</span>
          </button>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-8 w-full justify-end">
          <a href="#hero" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">O mnie</a>
          <a href="#gallery" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Galeria</a>
          <a href="#contact" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Lista oczekujących</a>
          <a href="#contact" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Kontakt</a>
        </nav>
      </div>
    </header>

    <main>
      <!-- Hero -->
      <section id="hero" class="@container md:max-w-7xl md:mx-auto">
        <div class="@[480px]:p-4">
          <div class="flex min-h-[420px] flex-col justify-end gap-6 bg-cover bg-center bg-no-repeat @[480px]:rounded-xl p-6 relative overflow-hidden group md:grid md:grid-cols-2 md:items-center md:gap-12 md:bg-transparent md:min-h-0 md:justify-center">

            <!-- Background Image for mobile/tablet, Column Image for Desktop -->
            <div class="absolute inset-0 md:relative md:order-2 md:h-[500px] md:rounded-2xl md:overflow-hidden md:shadow-xl">
              <NuxtImg
                src="https://i.postimg.cc/MHxft4y4/becia.jpg"
                class="w-full h-full object-cover md:absolute md:inset-0"
                alt="Close up of soft colorful handmade crochet plush toys"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/20 md:hidden"></div>
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-3 text-center z-10 relative md:order-1 md:text-left md:items-start md:justify-center">
              <span class="text-white md:text-leather text-xs md:text-sm font-bold tracking-widest drop-shadow-md md:drop-shadow-none uppercase">PASJA DO RĘKODZIEŁA</span>
              <h1 class="text-white md:text-slate-900 md:dark:text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-6xl drop-shadow-md md:drop-shadow-none md:text-5xl lg:text-6xl">
                <div><span class="text-[50px] md:text-[60px] tracking-[-1.5px] md:tracking-tight">Mięciutkie szydełkowani</span></div>
              </h1>
              <p class="text-primary md:text-leather/80 text-lg font-semibold @[480px]:text-2xl drop-shadow-sm md:drop-shadow-none">~by @Becia</p>

              <p class="text-white/90 md:text-slate-600 md:dark:text-slate-300 text-sm md:text-base mt-2 drop-shadow-sm md:drop-shadow-none max-w-md mx-auto md:mx-0">
                Odkryj świat ręcznie robionych, przytulnych maskotek. Każdy splot to kawałek serca włożony w to, by wywołać uśmiech na Twojej twarzy.
              </p>

              <a href="#gallery" class="leather-patch flex min-w-[160px] w-max mx-auto md:mx-0 cursor-pointer items-center justify-center rounded-lg h-12 px-6 mt-4 text-white text-base font-bold shadow-lg transform active:scale-95 transition-transform relative z-10">
                <span class="truncate">Zobacz moje prace</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      <!-- Status -->
      <section class="p-4 @container md:max-w-7xl md:mx-auto md:w-full">
        <div class="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border-2 border-dashed border-leather/40 bg-white dark:bg-slate-800 p-6 shadow-sm @[480px]:flex-row @[480px]:items-center md:px-10 md:py-8">
          <div class="flex items-center gap-4">
            <div class="relative">
              <div
                class="size-4 rounded-full"
                :class="[statusData?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400']"
              ></div>
              <div
                v-if="statusData?.isOnline"
                class="absolute inset-0 size-4 bg-green-500 rounded-full opacity-50 blur-sm"
              ></div>
            </div>
            <div class="flex flex-col gap-1">
              <p class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">
                {{ statusData?.isOnline ? 'Becia teraz pracuje (Online)' : 'Becia teraz odpoczywa (Offline)' }}
              </p>
              <p class="text-stitch-brown dark:text-primary/80 text-sm font-normal">
                {{ statusData?.isOnline ? 'Aktualnie przyjmuję nowe zamówienia na wymarzone maskotki.' : 'Wracam niebawem z nową energią do szydełkowania.' }}
              </p>
              <!-- Content z CMS -->
              <ContentRenderer v-if="statusData?.body" :value="statusData" class="text-sm mt-1 text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          <a href="#contact" class="flex min-w-[140px] items-center justify-center rounded-full h-10 px-6 bg-primary text-leather text-sm font-bold border border-leather/20 shadow-sm hover:opacity-90 transition-opacity">
            Skontaktuj się
          </a>
        </div>
      </section>

      <!-- Gallery -->
      <section id="gallery" class="py-6 md:max-w-7xl md:mx-auto md:w-full md:py-12">
        <div class="flex items-center justify-between px-4 pb-4 md:mb-6">
          <h2 class="text-leather dark:text-primary text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <span class="material-symbols-outlined">auto_awesome</span>
            Moje Szydełkowe Dzieła
          </h2>
        </div>
        <div class="flex overflow-x-auto pb-6 px-4 gap-4 snap-x no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none md:pb-0">
          <div class="flex-none w-64 snap-center md:w-auto md:flex-1">
            <div class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md transition-transform hover:scale-105 duration-300">
              <div class="w-full aspect-[4/5] relative">
                <NuxtImg
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPdBTPrpSuC4MN9MkFrNSycXfBoLsvSiuKzSdRETvfdPWjvnMJS3UsxxqSjfxUT0M9cava4dLpniV0axZcQgwXKrW0_sonraHWigSM_V4_-yY9ceqvdhf7VNzv2eQOhsBYHLPdgJg-KoFA0ndhyYnBoGwKq3hDpQh4lPk3JXR5NvZhapEeOeenMhjfjWxyX91q6fRpzlv_RxSYTopT6kKUOIggsocw-Xh1bGXAHKQUE_tZsmNpRB85EA0jQS08YrPBEje1P176EAY"
                  alt="Handmade crochet light brown teddy bear"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="p-3 bg-white dark:bg-slate-800">
                <p class="text-leather dark:text-primary font-bold">Miś Przytulanka</p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">Ręcznie robione z miłością</p>
              </div>
            </div>
          </div>
          <div class="flex-none w-64 snap-center md:w-auto md:flex-1">
            <div class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md transition-transform hover:scale-105 duration-300">
              <div class="w-full aspect-[4/5] relative">
                <NuxtImg
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAukU2TYy4zk8569P5g4B_0aVO8ZrokQtVCs06WLcGAUOtlx0HGHVkPYYrgzuhkikouJVjonGfF0Mpw9jB51m6u_CrlIAND_mgXp-NcLi_yeEfVYF2i5C40pqQXtncLZHfkBbyTlAlIl8UJUoDmm95c-bF78j5Sl5oTL1uCFMZC0OaVrSsozXes9kPVw7wFkJFmhygu4QlqK_dojmlZhic9GQ6tEZCMoAyO4OVcDFWEV93k-G7lxS7u6P55Nk6xHS_oI6RjSu1ILUM"
                  alt="Colorful crochet flowers in a small pot"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="p-3 bg-white dark:bg-slate-800">
                <p class="text-leather dark:text-primary font-bold">Szydełkowe Kwiaty</p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">Prezent, który nie więdnie</p>
              </div>
            </div>
          </div>
          <div class="flex-none w-64 snap-center md:w-auto md:flex-1">
            <div class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md transition-transform hover:scale-105 duration-300">
              <div class="w-full aspect-[4/5] relative">
                <NuxtImg
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcX-sExvAK0n1oTo4qhpOSdSeqyQqWaUIxCjufNXG31G7pMOVduJ1U-unbF71oFZnGxlRNKp21zmpRxVzqXv-g7YyJKCWdpReAVEcFj6LPRDwxFeXQ_zYPsgTP-k3DQ4cI8dLL6FZ_Xdv0jJcczrSnEPJ-lD9Bfi9ojJngX_63l6m4R8N1wJ0hAnEkX6bc_uj8RW-mFfhDxGnXyzXKyvE1uNgM3zqtgFrBPu5-nvmIC-ZwVGkiED0WPRi2NIlvpReggs_MMvIpx2U"
                  alt="Cute amigurumi doll with pink dress"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="p-3 bg-white dark:bg-slate-800">
                <p class="text-leather dark:text-primary font-bold">Lalka Amigurumi</p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">Dla Twojej pociechy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form -->
      <section id="contact" class="p-4 bg-primary/10 py-12 md:py-20">
        <div class="max-w-xl mx-auto">
          <div class="text-center mb-8">
            <div class="inline-block p-3 bg-white dark:bg-slate-800 rounded-full mb-4 shadow-sm">
              <span class="material-symbols-outlined text-leather text-4xl">edit_note</span>
            </div>
            <h2 class="text-leather dark:text-primary text-2xl font-black mb-2">Lista oczekujących</h2>
            <p class="text-stitch-brown dark:text-slate-300">Zostaw wiadomość, aby zarezerwować termin na swoje wymarzone dzieło.</p>
          </div>

          <form @submit.prevent="submitForm" class="space-y-4 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-2 border-leather/10 relative">
            <div class="!absolute -top-3 -right-3 leather-patch h-10 w-24 rounded flex items-center justify-center text-xs text-white font-bold rotate-12">
              HANDMADE
            </div>

            <div>
              <label class="block text-sm font-bold text-leather mb-1">Twoje Imię</label>
              <input v-model="form.name" required type="text" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" placeholder="Ania Kowalska">
            </div>

            <div>
              <label class="block text-sm font-bold text-leather mb-1">E-mail</label>
              <input v-model="form.email" required type="email" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" placeholder="twoj@email.pl">
            </div>

            <div>
              <label class="block text-sm font-bold text-leather mb-1">Co chciałabyś/chciałbyś zamówić?</label>
              <textarea v-model="form.message" required rows="4" class="w-full rounded-lg border-primary/30 focus:border-leather focus:ring-leather bg-background-light dark:bg-slate-700" placeholder="Opisz swoją wymarzoną maskotkę..."></textarea>
            </div>

            <!-- Messages -->
            <div v-if="successMsg" class="p-3 text-sm text-green-700 bg-green-100 rounded-lg">{{ successMsg }}</div>
            <div v-if="errorMsg" class="p-3 text-sm text-red-700 bg-red-100 rounded-lg">{{ errorMsg }}</div>

            <button :disabled="pending" type="submit" class="leather-patch w-full py-4 text-white font-black text-lg rounded-lg shadow-xl hover:opacity-90 transition-opacity disabled:opacity-50">
              {{ pending ? 'Wysyłanie...' : 'ZAPISZ MNIE NA LISTĘ' }}
            </button>
            <p class="text-center text-[10px] text-slate-400 mt-4 italic">
              * Skontaktuję się z Tobą w ciągu 48h, aby omówić szczegóły i czas realizacji.
            </p>
          </form>
        </div>
      </section>
    </main>

    <footer class="p-8 text-center bg-background-light dark:bg-background-dark">
      <div class="flex justify-center gap-6 mb-6">
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">photo_camera</span></a>
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">chat_bubble</span></a>
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">mail</span></a>
      </div>
      <p class="text-slate-500 text-sm">© 2024 Mięciutkie szydełkowanie ~by @Becia</p>
      <div class="mt-4 flex justify-center items-center gap-1 text-slate-400 text-xs">
        <span>Wykonano z</span>
        <span class="material-symbols-outlined text-red-400 text-sm">favorite</span>
        <span>przez Becię</span>
      </div>
    </footer>
  </div>
</template>