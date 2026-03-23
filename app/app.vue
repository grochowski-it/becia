<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

const route = useRoute()

// Define the base site URL
const siteUrl = 'https://becia.pl'

// Add the canonical tag globally for all pages based on the current route
useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `${siteUrl}${route.path}`
    }
  ]
}))
</script>

<template>
  <NuxtPage />
</template>
