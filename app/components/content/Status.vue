<script setup lang="ts">
const props = defineProps<{
  isOnline: string | boolean
  textOnline: string
  textOnlineDesc: string
  textOffline: string
  textOfflineDesc: string
  link: string
}>()

const isUserOnline = computed(() => props.isOnline === 'true' || props.isOnline === true)
</script>

<template>
  <section class="p-4 @container md:max-w-7xl md:mx-auto md:w-full">
    <div class="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border-2 border-dashed border-leather/40 bg-white dark:bg-slate-800 p-6 shadow-sm @[480px]:flex-row @[480px]:items-center md:px-10 md:py-8">
      <div class="flex items-center gap-4">
        <div class="relative">
          <div
            class="size-4 rounded-full"
            :class="[isUserOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400']"
          ></div>
          <div
            v-if="isUserOnline"
            class="absolute inset-0 size-4 bg-green-500 rounded-full opacity-50 blur-sm"
          ></div>
        </div>
        <div class="flex flex-col gap-1">
          <p class="text-slate-900 dark:text-slate-100 text-lg font-bold leading-tight">
            {{ isUserOnline ? textOnline : textOffline }}
          </p>
          <p class="text-stitch-brown dark:text-primary/80 text-sm font-normal">
            {{ isUserOnline ? textOnlineDesc : textOfflineDesc }}
          </p>
        </div>
      </div>
      <a href="#contact" class="flex min-w-[140px] items-center justify-center rounded-full h-10 px-6 bg-primary text-leather text-sm font-bold border border-leather/20 shadow-sm hover:opacity-90 transition-opacity">
        {{ link }}
      </a>
    </div>
  </section>
</template>