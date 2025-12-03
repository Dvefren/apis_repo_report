import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // AGREGA ESTA LÍNEA (Debe ser el mismo nombre de tu repositorio)
  base: '/apis_repo_report/', 
})