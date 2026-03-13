<script setup lang="ts">
import { useAsyncData } from '#app'

const { data: latestPost } = await useAsyncData('latest_blog_post', () =>
  queryCollection('blog').order('date', 'DESC').first()
)
</script>

<template>
  <section v-if="latestPost" id="latest-blog" class="py-6 md:max-w-7xl md:mx-auto md:w-full md:py-12 px-4">
    <div class="flex flex-col md:flex-row items-center justify-between mb-6 md:mb-10 gap-4">
      <div class="flex items-center gap-2 text-leather dark:text-primary text-2xl md:text-3xl font-bold tracking-tight">
        <span class="material-symbols-outlined">auto_stories</span>
        <h2 class="m-0 text-inherit font-inherit">Ostatnio na blogu</h2>
      </div>
      <NuxtLink to="/blog" class="flex items-center gap-2 text-leather dark:text-primary font-bold hover:underline transition-all">
        Zobacz wszystkie wpisy
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </NuxtLink>
    </div>

    <article class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 flex flex-col md:flex-row transition-transform hover:-translate-y-1 duration-300 md:max-h-[33vh]">
      <NuxtLink :to="latestPost.path" class="md:w-1/3 shrink-0 block overflow-hidden">
        <NuxtImg
          v-if="latestPost.image"
          :src="latestPost.image"
          :alt="latestPost.alt || latestPost.title"
          class="w-full h-64 md:h-full object-cover transition-transform hover:scale-105 duration-500"
          :class="latestPost.objectPosition || 'object-center'"
          loading="lazy"
        />
      </NuxtLink>
      <div class="p-6 md:p-8 flex flex-col justify-center flex-1 overflow-y-auto">
        <h3 class="text-2xl font-black text-leather dark:text-primary mb-3 leading-tight">
          <NuxtLink :to="latestPost.path">{{ latestPost.title }}</NuxtLink>
        </h3>
        <p class="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2">
          {{ latestPost.description }}
        </p>
        <div class="mt-auto">
          <NuxtLink :to="latestPost.path" class="inline-flex items-center gap-2 px-6 py-3 bg-leather text-white rounded-xl font-bold hover:bg-leather/90 transition-colors shadow-md w-fit">
            <span class="material-symbols-outlined">menu_book</span>
            Czytaj dalej
          </NuxtLink>
        </div>
      </div>
    </article>
  </section>
</template>
