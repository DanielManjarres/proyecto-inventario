/* eslint-disable no-undef */
/* global process */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  preview: {
    host: true,  // Esto permite que escuche en todos los hosts
    port: Number(process.env.PORT) || 3000,
    allowedHosts: ['all'],  // ← Array con 'all' en lugar de string
    // O más seguro (recomendado para Railway):
    // allowedHosts: ['.up.railway.app', 'frontend-production-2351.up.railway.app']
  },

  server: {
    host: true,
    port: 3000,
    allowedHosts: ['all'],
  },
})