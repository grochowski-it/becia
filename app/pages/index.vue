<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const { data: page } = await useAsyncData('page', () => queryCollection('page').first())

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

// SEO z Nuxt Content
if (page.value) {
  useSeoMeta({
    title: page.value.title,
    description: page.value.description,
    ogTitle: page.value.title,
    ogDescription: page.value.description,
    ogImage: 'https://i.postimg.cc/MHxft4y4/becia.jpg',
    twitterTitle: page.value.title,
    twitterDescription: page.value.description,
    twitterImage: 'https://i.postimg.cc/MHxft4y4/becia.jpg',
    twitterCard: 'summary_large_image'
  })
}

// Global SEO Head (dla np. geo meta tagów)
useHead({
  meta: [
    { name: 'geo.region', content: 'PL-10' },
    { name: 'geo.placename', content: 'Zgierz, Łódź' }
  ]
})

// Dane strukturalne w standardzie Nuxt SEO (Schema.org)
useSchemaOrg([
  defineWebSite({
    name: 'Mięciutkie szydełkowanie by Becia'
  }),
  defineWebPage(),
  defineLocalBusiness({
    name: 'Mięciutkie szydełkowanie by Becia',
    description: 'Ręcznie robione szydełkowe pluszaki i maskotki, lalki amigurumi. Szydełkowanie z miłością.',
    address: {
      addressLocality: 'Zgierz',
      addressRegion: 'Łódzkie',
      addressCountry: 'PL'
    },
    image: 'https://i.postimg.cc/MHxft4y4/becia.jpg'
  })
])
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
    <header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-center sticky top-0 z-50 border-b border-primary/20">
      <div class="flex items-center justify-between w-full max-w-7xl">
        <div class="flex size-20 shrink-0 items-center justify-center">
          <Icon name="custom:logo" class="w-20 h-20 text-leather" />
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
      <ContentRenderer v-if="page" :value="page" class="flex flex-col gap-0 md:gap-0" />
    </main>

    <Footer
      copyright="© 2024 Mięciutkie szydełkowanie ~by @Becia"
      made-with="Wykonano z"
      by="przez Becię"
      icon="favorite"
    />

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