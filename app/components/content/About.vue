<script setup lang="ts">
defineProps<{
  title: string
  text: string
  linkText: string
}>()
</script>

<template>
  <section class="p-6 md:hidden flex flex-col items-center text-center">
    <h1 class="text-leather text-xs md:text-sm font-bold tracking-widest uppercase mb-2 mt-0">{{ title }}</h1>
    <p class="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-6 mt-0">{{ text }}</p>
    <a href="#gallery" class="leather-patch flex min-w-[160px] w-max mx-auto cursor-pointer items-center justify-center rounded-lg h-12 px-8 text-white text-base font-bold shadow-lg transform active:scale-95 transition-transform mb-4">
      <span class="truncate">{{ linkText }}</span>
    </a>
  </section>
</template>