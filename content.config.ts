import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    page: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    gallery: defineCollection({
      type: 'data',
      source: 'gallery.yml',
      schema: z.object({
        images: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          title: z.string(),
          description: z.string()
        }))
      })
    })
  }
})