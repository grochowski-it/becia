<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  image: string
  alt: string
  text?: string
  linkText?: string
  imagePositionX?: string
  imagePositionY?: string
}>()
</script>

<template>
  <section id="hero" class="p-4 @container md:max-w-7xl md:mx-auto md:w-full">
    <div class="@[480px]:p-4 md:w-full">
      <div class="flex min-h-[500px] flex-col justify-end gap-6 bg-cover bg-center bg-no-repeat rounded-xl p-6 relative overflow-hidden group md:grid md:grid-cols-2 md:items-center md:gap-12 md:bg-transparent md:min-h-0 md:justify-center md:p-0 md:w-full">
        <!-- Background Image for mobile/tablet, Column Image for Desktop -->
        <div class="absolute inset-0 md:relative md:order-2 md:h-[600px] md:rounded-xl md:overflow-hidden md:shadow-xl md:w-full">
          <NuxtImg
            :src="image"
            class="w-full h-full object-cover md:absolute md:inset-0"
            :style="{ objectPosition: `${imagePositionX || '50%'} ${imagePositionY || '50%'}` }"
            :alt="alt"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/20 md:bg-transparent"></div>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-3 text-center z-10 relative mt-auto md:mt-0 md:order-1 md:text-left md:items-start md:justify-center md:w-full md:px-8">
          <h1 class="text-white md:text-slate-900 md:dark:text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-6xl drop-shadow-md md:drop-shadow-none md:text-5xl lg:text-6xl m-0">
            {{ title }}
          </h1>
          <p class="text-primary md:text-leather/80 text-lg font-semibold @[480px]:text-2xl drop-shadow-sm md:drop-shadow-none m-0">
            {{ subtitle }}
          </p>

          <p v-if="text" class="hidden md:block text-slate-700 dark:text-slate-300 text-base font-normal leading-relaxed mt-4">
            {{ text }}
          </p>

          <div v-if="linkText" class="hidden md:flex items-center justify-start mt-4">
            <a href="#gallery" class="flex min-w-[140px] items-center justify-center rounded-full h-12 px-8 bg-warm-orange text-white text-base font-bold shadow-md hover:bg-opacity-90 transition-all hover:scale-105">
              {{ linkText }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>