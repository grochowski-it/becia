<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '~/stores/order'
import { useSlugify } from '~/composables/useSlugify'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const slug = route.params.slug as string

// Fetch gallery data to find the current product
const { data: galleryData } = await useAsyncData('gallery_items_modal', () => queryCollection('gallery').first())

const product = computed(() => {
  if (!galleryData.value?.images) return null
  return galleryData.value.images.find(img => useSlugify(img.title) === slug)
})

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Produkt nie znaleziony' })
}

// Fetch main page content to render underneath
const { data: page } = await useAsyncData('page_bg', () => queryCollection('page').first())

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

// SEO & Rich Snippets for Product
const siteUrl = 'https://becia.pl'
useSeoMeta({
  title: `${product.value.title} - Mięciutkie szydełkowanie`,
  description: product.value.description,
  ogTitle: `${product.value.title} - Mięciutkie szydełkowanie`,
  ogDescription: product.value.description,
  ogImage: product.value.src,
  twitterTitle: `${product.value.title} - Mięciutkie szydełkowanie`,
  twitterDescription: product.value.description,
  twitterImage: product.value.src,
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineProduct({
    name: product.value.title,
    description: product.value.description,
    image: product.value.src,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0.00',
      priceCurrency: 'PLN',
    }
  })
])

const isClosing = ref(false)

const closeModal = () => {
  isClosing.value = true
  setTimeout(() => {
    router.push('/')
  }, 300)
}

const orderSimilar = () => {
  if (!product.value) return
  const message = `Chciałabym/Chciałbym zamówić produkt podobny do: "${product.value.title}".\nOpis: ${product.value.description}\nLink: ${siteUrl}/produkt/${slug}\n\nPotrzebuję go na: [Wpisz datę lub "bez pośpiechu"]`

  isClosing.value = true
  setTimeout(() => {
    orderStore.setOrderMessage(message)
    orderStore.setOrderTopic('Zamówienie')
    router.push('/#contact')
  }, 300)
}

</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">

    <!-- Background Content (Index page structure) -->
    <header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-center sticky top-0 z-0 border-b border-primary/20">
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
        <nav class="hidden md:flex items-center gap-8 w-full justify-end">
          <NuxtLink to="/#hero" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">O mnie</NuxtLink>
          <NuxtLink to="/#gallery" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Galeria</NuxtLink>
          <NuxtLink to="/#contact" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Lista oczekujących</NuxtLink>
          <NuxtLink to="/#contact" class="text-leather dark:text-primary font-bold hover:text-primary/80 transition-colors">Kontakt</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="z-0 blur-sm pointer-events-none opacity-50 select-none">
      <ContentRenderer v-if="page" :value="page" class="flex flex-col gap-0 md:gap-0" />
    </main>

    <!-- Modal Overlay -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8 transition-opacity duration-300 bg-background-light/90 dark:bg-background-dark/90 md:bg-black/60 md:backdrop-blur-sm"
      :class="{ 'opacity-0': isClosing, 'opacity-100': !isClosing }"
    >
      <!-- Modal Content -->
      <div
        class="relative flex flex-col w-full h-full md:w-[80vw] md:h-[80vh] bg-white dark:bg-slate-800 md:rounded-2xl shadow-2xl overflow-hidden transition-transform duration-300"
        :class="{ 'scale-95 translate-y-4': isClosing, 'scale-100 translate-y-0': !isClosing }"
      >
        <!-- Mobile Header (Back Button) -->
        <div class="md:hidden flex items-center p-4 border-b border-leather/10 bg-white dark:bg-slate-800 z-10 sticky top-0">
          <button @click="closeModal" class="flex items-center justify-center p-2 mr-2 text-leather dark:text-primary hover:bg-primary/10 rounded-full transition-colors">
            <span class="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h1 class="text-leather dark:text-primary text-lg font-bold truncate">{{ product.title }}</h1>
        </div>

        <!-- Desktop Close Button -->
        <button @click="closeModal" class="hidden md:flex absolute top-4 right-4 z-10 items-center justify-center p-2 text-leather dark:text-primary bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 rounded-full shadow-md backdrop-blur-sm transition-colors">
          <span class="material-symbols-outlined text-2xl">close</span>
        </button>

        <div class="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden h-full">
          <!-- Image Section -->
          <div class="w-full md:w-1/2 h-64 md:h-full shrink-0 relative bg-slate-100 dark:bg-slate-900 border-b md:border-b-0 md:border-r border-leather/10">
            <NuxtImg
              v-if="product.src"
              :src="product.src"
              :alt="product.alt"
              class="absolute inset-0 w-full h-full object-cover"
              :class="product.objectPosition || 'object-center'"
              loading="lazy"
            />
          </div>

          <!-- Content Section -->
          <div class="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
            <div class="flex-1">
              <h1 class="hidden md:block text-leather dark:text-primary text-3xl font-black mb-4">{{ product.title }}</h1>

              <div class="prose prose-slate dark:prose-invert">
                <p class="text-lg text-slate-700 dark:text-slate-300">{{ product.description }}</p>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-4">{{ product.alt }}</p>
              </div>

              <div v-if="product.blogLink" class="mt-8">
                <NuxtLink :to="product.blogLink" class="inline-flex items-center gap-2 text-leather dark:text-primary font-bold hover:text-leather/80 dark:hover:text-primary/80 transition-colors hover:underline">
                  <span class="material-symbols-outlined">article</span>
                  Czytaj na blogu
                </NuxtLink>
              </div>
            </div>

            <!-- Action Section -->
            <div class="mt-8 pt-6 border-t border-leather/10">
              <button @click="orderSimilar" class="leather-patch w-full py-4 text-white font-black text-lg rounded-lg shadow-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                <span class="material-symbols-outlined">shopping_basket</span>
                Zamów podobne
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
