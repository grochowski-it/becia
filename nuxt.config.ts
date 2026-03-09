// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxthq/studio',
    '@nuxt/image'
  ],
  studio: {
    repository: {
      provider: 'github',
      owner: 'mrGrochowski',
      repo: 'becia',
      branch: 'main'
    }
  },
  css: [
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: 'pl'
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/icon-192x192.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          href: '/icon-512x512.png'
        },
        {
          rel: 'apple-touch-icon',
          href: '/icon-192x192.png'
        }
      ]
    }
  },
  runtimeConfig: {
    smtp: {
      smtpHost: process.env.SMTP_HOST || '',
      smtpPort: process.env.SMTP_PORT || '',
      smtpUser: process.env.SMTP_USER || '',
      smtpPass: process.env.SMTP_PASS || '',
      smtpFrom: process.env.SMTP_FROM || '',
      smtpTo: process.env.SMTP_TO || ''
    }
  },
  devtools: { enabled: true }
})