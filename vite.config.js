import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // active Tailwind
    VitePWA({
      // Met à jour automatiquement le service worker quand tu redéploies
      registerType: 'autoUpdate',
      // Le "manifest" décrit l'app au téléphone : nom, couleurs, icônes
      manifest: {
        name: 'SÉCURIPF IA',
        short_name: 'SÉCURIPF',
        description: 'Anticiper les ruptures, préserver les choix.',
        theme_color: '#145da0',       // couleur de la barre du navigateur
        background_color: '#f9f9ff',  // couleur de l'écran de démarrage
        display: 'standalone',        // s'ouvre comme une vraie app, sans barre d'URL
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      // Active la PWA aussi en mode développement pour pouvoir la tester
      devOptions: { enabled: true },
    }),
  ],
})