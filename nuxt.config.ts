// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      title: "Mr_MaTriX",
      link: [{ rel: 'icon', type: 'image/webp', href: "/aboutImg.webp" }]
    }
  },
   modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxt/content',
    '@nuxt/icon'
  ]
})