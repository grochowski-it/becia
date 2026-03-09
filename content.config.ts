import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    status: defineCollection({
      type: 'page',
      source: 'status.md',
      schema: z.object({
        isOnline: z.boolean().default(true)
      })
    }),
    hero: defineCollection({
      type: 'page',
      source: 'hero.md'
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.md'
    }),
    gallery: defineCollection({
      type: 'page',
      source: 'gallery.md',
      schema: z.object({
        images: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          title: z.string(),
          description: z.string()
        }))
      })
    }),
    contact: defineCollection({
      type: 'page',
      source: 'contact.md'
    }),
    footer: defineCollection({
      type: 'page',
      source: 'footer.md'
    })
  }
})