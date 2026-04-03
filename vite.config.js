import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        explore: resolve(__dirname, 'explore.html'),
        'gem-detail': resolve(__dirname, 'gem-detail.html'),
        'submit-gem': resolve(__dirname, 'submit-gem.html'),
        'tourist-login': resolve(__dirname, 'tourist-login.html'),
        'tourist-profile': resolve(__dirname, 'tourist-profile.html'),
        'guide-login': resolve(__dirname, 'guide-login.html'),
        'guide-dashboard': resolve(__dirname, 'guide-dashboard.html'),
        'find-guide': resolve(__dirname, 'find-guide.html'),
        community: resolve(__dirname, 'community.html'),
        booking: resolve(__dirname, 'booking.html'),
      }
    }
  }
})
