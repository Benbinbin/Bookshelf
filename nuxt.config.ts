import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {},
  typescript: {
    shim: false
  },
  modules: [
    '@nuxt-themes/config/module',
    '@nuxt/content',
    '@nuxtjs/tailwindcss'
  ],
  // https://nuxt-themes.netlify.app/
  theme: {
    meta: {
      name: 'Bookshelf',
      description: 'A Nuxt theme for showing book highlights.',
      author: 'Benbinbin',
      url: 'https://bookshelf.benbinbin.com/'
    }
  },
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['_id', '_type']
    },
  }
})
