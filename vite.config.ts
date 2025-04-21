import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()], server: {
        allowedHosts: ['all', 'e97d-91-132-92-160.ngrok-free.app'],
    },
})
