
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SÉCURIPF IA',
        short_name: 'SÉCURIPF',
        description: 'Anticiper les ruptures, préserver les choix.',
        theme_color: '#145da0',
        background_color: '#f9f9ff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      devOptions: { enabled: true },
    }),
  ],

  server: {
    host: '0.0.0.0',
    allowedHosts: [
      'attendant-subway-limes.ngrok-free.dev'
    ],
  },
})
