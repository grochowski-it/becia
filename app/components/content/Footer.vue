<script setup lang="ts">
defineProps<{
  copyright: string
  madeWith: string
  by: string
  icon: string
}>()
</script>

<template>
  <footer class="p-8 pb-24 text-center bg-background-light dark:bg-background-dark">
    <div class="flex justify-center gap-6 mb-6">
      <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">photo_camera</span></a>
      <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">chat_bubble</span></a>
      <a href="#" class="text-leather dark:text-primary"><span class="material-symbols-outlined text-3xl">mail</span></a>
    </div>
    <div class="text-slate-500 text-sm mb-2 mt-0">
      <p>{{ copyright }}</p>
      <p class="text-slate-400 text-xs flex justify-center items-center gap-1 mt-2">
        <span>{{ madeWith }}</span>
        <span class="material-symbols-outlined text-red-400 text-sm">{{ icon }}</span>
        <span>{{ by }}</span>
      </p>
    </div>
  </footer>
</template>