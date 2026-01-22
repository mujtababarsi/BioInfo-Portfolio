import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // IMPORTANT: Replace 'YOUR_REPO_NAME' with your actual repository name (e.g., '/my-portfolio/')
  // If you are deploying to your-username.github.io directly, set this to '/'
  base: '/BioInfo-Portfolio/', 
  
  plugins: [react()],
  resolve: {
    // Forces all libraries to use the single copy of React to prevent "Invalid Hook Call" crashes
    dedupe: ['react', 'react-dom', 'framer-motion'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'recharts', 'lucide-react'],
  },
})