<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  image: string
  alt: string
}>()
</script>

<template>
  <section id="hero" class="p-4 @container md:max-w-7xl md:mx-auto">
    <div class="@[480px]:p-4">
      <div class="flex min-h-[500px] flex-col justify-end gap-6 bg-cover bg-center bg-no-repeat @[480px]:rounded-xl p-6 relative overflow-hidden group md:grid md:grid-cols-2 md:items-center md:gap-12 md:bg-transparent md:min-h-0 md:justify-center">
        <!-- Background Image for mobile/tablet, Column Image for Desktop -->
        <div class="absolute inset-0 md:relative md:order-2 md:h-[600px] md:rounded-2xl md:overflow-hidden md:shadow-xl">
          <NuxtImg
            :src="image"
            class="w-full h-full object-cover md:absolute md:inset-0"
            :alt="alt"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/20 "></div>
        </div>

        <!-- Content -->
        <div class="flex flex-col gap-3 text-center z-10 relative mt-auto md:mt-0 md:order-1 md:text-left md:items-start md:justify-center">
          <h1 class="text-white md:text-slate-900 md:dark:text-white text-4xl font-black leading-tight tracking-tight @[480px]:text-6xl drop-shadow-md md:drop-shadow-none md:text-5xl lg:text-6xl m-0">
            {{ title }}
          </h1>
          <p class="text-primary md:text-leather/80 text-lg font-semibold @[480px]:text-2xl drop-shadow-sm md:drop-shadow-none m-0">
            {{ subtitle }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>