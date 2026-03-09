<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { data: statusData } = await useAsyncData('status', () => queryCollection('status').first())
const { data: heroData } = await useAsyncData('hero', () => queryCollection('hero').first())
const { data: aboutData } = await useAsyncData('about', () => queryCollection('about').first())
const { data: galleryData } = await useAsyncData('gallery', () => queryCollection('gallery').first())
const { data: contactData } = await useAsyncData('contact', () => queryCollection('contact').first())
const { data: footerData } = await useAsyncData('footer', () => queryCollection('footer').first())

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


const showBottomNav = ref(false)

const handleScroll = () => {
  if (window.scrollY > 400) {
    showBottomNav.value = true
  } else {
    showBottomNav.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

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
        <div class="flex size-12 shrink-0 items-center justify-center">
          <NuxtImg
            src="/logo.png"
            alt="Logo"
            class="w-full h-full object-contain"
            width="48"
            height="48"
          />
        </div>

        <h2 class="text-leather dark:text-primary text-lg font-bold leading-tight tracking-tight flex-1 text-center">Mięciutkie szydełkowanie</h2>

        <div class="flex w-12 items-center justify-end ">
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
          <div class="flex min-h-[500px] flex-col justify-end gap-6 bg-cover bg-center bg-no-repeat @[480px]:rounded-xl p-6 relative overflow-hidden group md:grid md:grid-cols-2 md:items-center md:gap-12 md:bg-transparent md:min-h-0 md:justify-center">

            <!-- Background Image for mobile/tablet, Column Image for Desktop -->
            <div class="absolute inset-0 md:relative md:order-2 md:h-[600px] md:rounded-2xl md:overflow-hidden md:shadow-xl">
              <NuxtImg
                src="https://i.postimg.cc/MHxft4y4/becia.jpg"
                class="w-full h-full object-cover md:absolute md:inset-0"
                alt="Close up of soft colorful handmade crochet plush toys"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/20 "></div>
            </div>

            <!-- Content -->
            <div class="flex flex-col gap-3 text-center z-10 relative mt-auto md:mt-0 md:order-1 md:text-left md:items-start md:justify-center [&_h1]:text-white md:[&_h1]:text-slate-900 md:dark:[&_h1]:text-white [&_h1]:text-4xl [&_h1]:font-black [&_h1]:leading-tight [&_h1]:tracking-tight @[480px]:[&_h1]:text-6xl [&_h1]:drop-shadow-md md:[&_h1]:drop-shadow-none md:[&_h1]:text-5xl lg:[&_h1]:text-6xl [&_p]:text-primary md:[&_p]:text-leather/80 [&_p]:text-lg [&_p]:font-semibold @[480px]:[&_p]:text-2xl [&_p]:drop-shadow-sm md:[&_p]:drop-shadow-none [&_h1]:m-0 [&_p]:m-0">
                <ContentRenderer v-if="heroData" :value="heroData" />
            </div>

          </div>
        </div>
      </section>


      <!-- Hero Descriptions -->
      <section class="p-6 md:max-w-7xl md:mx-auto md:w-full flex flex-col items-center text-center [&_h1]:text-leather [&_h1]:text-xs md:[&_h1]:text-sm [&_h1]:font-bold [&_h1]:tracking-widest [&_h1]:uppercase [&_h1]:mb-2 [&_h1]:mt-0 [&_p]:text-slate-600 dark:[&_p]:text-slate-300 [&_p]:text-base md:[&_p]:text-lg [&_p]:max-w-2xl [&_p]:mx-auto [&_p]:mb-6 [&_p]:mt-0">
        <ContentRenderer v-if="aboutData" :value="aboutData" />

        <a href="#gallery" class="leather-patch flex min-w-[160px] w-max mx-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 text-white text-base font-bold shadow-lg transform active:scale-95 transition-transform mb-4">
          <span class="truncate">Zobacz moje prace</span>
        </a>
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
          <div class="flex items-center gap-2 text-leather dark:text-primary text-2xl md:text-3xl font-bold tracking-tight [&_h1]:m-0 [&_h1]:text-inherit [&_h1]:font-inherit [&_p]:m-0">
            <span class="material-symbols-outlined">auto_awesome</span>
            <ContentRenderer v-if="galleryData" :value="galleryData" />
          </div>
        </div>
        <div class="flex overflow-x-auto pb-6 px-4 gap-4 snap-x no-scrollbar md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:snap-none md:pb-0">
          <div v-for="(image, index) in galleryData?.images" :key="index" class="flex-none w-64 snap-center md:w-auto md:flex-1">
            <div class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md transition-transform hover:scale-105 duration-300">
              <div class="w-full aspect-[4/5] relative">
                <NuxtImg
                  :src="image.src"
                  :alt="image.alt"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="p-3 bg-white dark:bg-slate-800">
                <p class="text-leather dark:text-primary font-bold">{{ image.title }}</p>
                <p class="text-slate-500 dark:text-slate-400 text-xs">{{ image.description }}</p>
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
            <div class="[&_h1]:text-leather dark:[&_h1]:text-primary [&_h1]:text-2xl [&_h1]:font-black [&_h1]:mb-2 [&_h1]:mt-0 [&_p]:text-stitch-brown dark:[&_p]:text-slate-300 [&_p]:m-0">
               <ContentRenderer v-if="contactData" :value="contactData" />
            </div>
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

    <footer class="p-8 pb-24 text-center bg-background-light dark:bg-background-dark">
      <div class="flex justify-center gap-6 mb-6">
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">photo_camera</span></a>
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">chat_bubble</span></a>
        <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">mail</span></a>
      </div>
      <div class="[&_p]:text-slate-500 [&_p]:text-sm [&_p]:mb-2 [&_p]:mt-0 [&_p]:last-of-type:text-slate-400 [&_p]:last-of-type:text-xs [&_p]:last-of-type:flex [&_p]:last-of-type:justify-center [&_p]:last-of-type:items-center [&_p]:last-of-type:gap-1">
        <ContentRenderer v-if="footerData" :value="footerData" />
      </div>
    </footer>

    <!-- Sticky Bottom Navigation (Mobile & Desktop, shown after scrolling) -->
    <div
      class="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-leather/20 z-50 transition-transform duration-300 "
      :class="showBottomNav ? 'translate-y-0' : 'translate-y-full'"
    >
      <div class="flex justify-around items-center p-3 max-w-7xl mx-auto">
        <a href="#hero" class="flex flex-col items-center gap-1 text-leather dark:text-primary hover:text-leather/80 transition-colors">
          <span class="material-symbols-outlined text-2xl">home</span>
          <span class="text-[10px] font-bold">Start</span>
        </a>
        <a href="#gallery" class="flex flex-col items-center gap-1 text-leather dark:text-primary hover:text-leather/80 transition-colors">
          <span class="material-symbols-outlined text-2xl">auto_awesome</span>
          <span class="text-[10px] font-bold">Galeria</span>
        </a>
        <a href="#contact" class="flex flex-col items-center gap-1 text-leather dark:text-primary hover:text-leather/80 transition-colors">
          <span class="material-symbols-outlined text-2xl">edit_note</span>
          <span class="text-[10px] font-bold">Kontakt</span>
        </a>
      </div>
    </div>

  </div>
</template>