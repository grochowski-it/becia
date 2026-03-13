<script setup lang="ts">
import { useAsyncData } from '#app'

const { data: posts } = await useAsyncData('blog_posts', () => queryCollection('blog').order('date', 'DESC').all())

useSeoMeta({
  title: 'Blog - Mięciutkie szydełkowanie by Becia',
  description: 'Najnowsze wpisy z bloga o rękodziele i maskotkach.'
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Strona Główna', item: '/' },
      { name: 'Blog' }
    ]
  })
])
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-[#FDFBF7] dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-center sticky top-0 z-50 border-b border-primary/20">
      <div class="flex items-center justify-between w-full max-w-7xl">
        <div class="flex w-12 items-center justify-start">
          <NuxtLink to="/" class="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-leather hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </NuxtLink>
        </div>

        <h1 class="text-leather dark:text-primary text-xl md:text-2xl font-bold leading-tight tracking-tight flex-1 text-center">Blog</h1>

        <div class="flex size-32 shrink-0 items-center justify-end">
          <NuxtLink to="/">
            <Icon name="custom:logo" class="w-32 h-32 text-leather" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1 py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="grid gap-8">
          <article v-for="post in posts" :key="post.path" class="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border-4 border-white dark:border-slate-700 flex flex-col sm:flex-row">
            <NuxtLink :to="post.path" class="sm:w-1/3 shrink-0 block">
              <NuxtImg v-if="post.image" :src="post.image" :alt="post.alt || post.title" class="w-full h-48 sm:h-full object-cover" loading="lazy" />
            </NuxtLink>
            <div class="p-6 flex-1 flex flex-col justify-center">
              <h2 class="text-2xl font-bold text-leather dark:text-primary mb-2">
                <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
              </h2>
              <p class="text-slate-500 dark:text-slate-400 mb-4">{{ post.description }}</p>
              <div class="mt-auto">
                <NuxtLink :to="post.path" class="inline-block px-4 py-2 bg-leather text-white rounded-md text-sm font-semibold hover:bg-leather/90 transition-colors">
                  Czytaj dalej
                </NuxtLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </main>

    <Footer
      copyright="© 2024 Mięciutkie szydełkowanie ~by @Becia"
      made-with="Wykonano z"
      by="przez Becię"
      icon="favorite"
    />
  </div>
</template>
