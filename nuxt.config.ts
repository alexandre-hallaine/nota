// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-17',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui-pro',
    '@nuxt/test-utils',
    'nuxt-auth-utils',
    '@nuxthub/core',
    '@nuxt/image'
  ],
  css: ['~/assets/css/main.css'],
  hub: { workers: true, database: true },
  nitro: { experimental: { openAPI: true } },
  $development: { hub: { remote: true } }
})