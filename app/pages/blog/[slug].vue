<script setup lang="ts">
import { useAsyncData } from '#app'

const route = useRoute()

const { data: post } = await useAsyncData(`blog_post_${route.path}`, () =>
  queryCollection('blog').path(route.path).first()
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: `${post.value.title} - Mięciutkie szydełkowanie by Becia`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: post.value.image
})

useSchemaOrg([
  defineArticle({
    headline: post.value.title,
    description: post.value.description,
    image: post.value.image,
    datePublished: post.value.date,
    dateModified: post.value.date,
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Strona Główna', item: '/' },
      { name: 'Blog', item: '/blog' },
      { name: post.value.title }
    ]
  })
])
</script>

<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden font-display bg-[#FDFBF7] dark:bg-slate-900 text-slate-900 dark:text-slate-100">
    <header class="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-center sticky top-0 z-50 border-b border-primary/20">
      <div class="flex items-center justify-between w-full max-w-7xl">
        <div class="flex w-12 items-center justify-start">
          <NuxtLink to="/blog" class="flex items-center justify-center rounded-full h-10 w-10 bg-primary/10 text-leather hover:bg-primary/20 transition-colors">
            <span class="material-symbols-outlined">arrow_back</span>
          </NuxtLink>
        </div>

        <h1 class="text-leather dark:text-primary text-xl md:text-2xl font-bold leading-tight tracking-tight flex-1 text-center truncate px-4">{{ post.title }}</h1>

        <div class="flex size-32 shrink-0 items-center justify-end">
          <NuxtLink to="/">
            <Icon name="custom:logo" class="w-32 h-32 text-leather" />
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1 py-12 px-4">
      <div class="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg p-6 md:p-10 border-4 border-white dark:border-slate-700">
        <header class="mb-8">
          <h1 class="text-3xl md:text-5xl font-bold text-leather dark:text-primary mb-4">{{ post.title }}</h1>
          <p class="text-slate-500 dark:text-slate-400 text-lg mb-6">{{ post.description }}</p>
          <div v-if="post.image" class="rounded-xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-md">
            <NuxtImg :src="post.image" :alt="post.alt || post.title" class="w-full h-auto object-cover max-h-[500px]" />
          </div>
        </header>

        <div class="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 [&_h1]:text-leather dark:[&_h1]:text-primary [&_h2]:text-leather dark:[&_h2]:text-primary [&_a]:text-leather dark:[&_a]:text-primary [&_a]:font-bold hover:[&_a]:underline">
          <ContentRenderer v-if="post" :value="post" />
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
