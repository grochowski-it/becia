// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@nuxt/image',
    'nuxt-studio',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@pinia/nuxt'
  ],
  site: {
    url: 'https://becia.pl',
    name: 'Mięciutkie szydełkowanie by Becia',
    description: 'Mięciutkie szydełkowanie - ręcznie robione z miłością. Pluszaki, kwiaty i lalki amigurumi.',
    defaultLocale: 'pl',
  },
  seo: {
    meta: {
      googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
    }
  },
  studio: {
    enabled: true,
    repository: {
      provider: 'github',
      owner: 'grochowski_it',
      repo: 'becia',
      branch: 'main'
    }
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
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
    },
    public: {
      googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || ''
    }
  },
  routeRules: {
    // Globalne nagłówki dla całej aplikacji (odcinają dostęp z innych domen)
    '/**': {
      headers: {
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self';"
      },
      prerender: true,
    },
    '/': { prerender: true },
    '/sitemap.xml': { prerender: true },
    '/robots.txt': { prerender: true },

  },
  nitro: {
    preset: 'vercel'
  },
  devtools: { enabled: true }
})