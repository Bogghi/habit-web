// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  modules: [
      "@primevue/nuxt-module",
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      theme: {
        preset: Aura
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    },
    plugins: [
      tailwindcss(),
    ],
  },
  runtimeConfig: {
    public: {
      PRIMEUI_LICENSE: process.env.NUXT_PUBLIC_PRIMEUI_LICENSE,
    }
  },
})
