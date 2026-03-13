<script setup lang="ts">
import { useAsyncData } from '#app'

defineProps<{
  title: string
  icon: string
}>()

const { data: galleryData } = await useAsyncData('gallery_items', () => queryCollection('gallery').first())
const images = computed(() => galleryData.value?.images || [])
</script>

<template>
  <section id="gallery" class="py-6 md:max-w-7xl md:mx-auto md:w-full md:py-12">
    <div class="flex items-center justify-between px-4 pb-4 md:mb-6">
      <div class="flex items-center gap-2 text-leather dark:text-primary text-2xl md:text-3xl font-bold tracking-tight">
        <span class="material-symbols-outlined">{{ icon }}</span>
        <h2 class="m-0 text-inherit font-inherit">{{ title }}</h2>
      </div>
    </div>
    <div class="flex overflow-x-auto pb-6 px-4 gap-4 snap-x no-scrollbar md:gap-8 md:snap-none md:pb-6">
      <NuxtLink
        v-for="(image, index) in images"
        :key="index"
        :to="`/produkt/${useSlugify(image.title)}`"
        class="flex-none w-64 snap-center md:w-80 block cursor-pointer"
      >
        <div class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md transition-transform hover:-translate-y-2 duration-300 h-full flex flex-col">
          <div class="w-full aspect-[4/5] relative shrink-0">
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              class="absolute inset-0 w-full h-full object-cover"
              :class="image.objectPosition || 'object-center'"
              loading="lazy"
            />
          </div>
          <div class="p-3 bg-white dark:bg-slate-800 flex-1">
            <p class="text-leather dark:text-primary font-bold">{{ image.title }}</p>
            <p class="text-slate-500 dark:text-slate-400 text-xs">{{ image.description }}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
