/* eslint-disable no-undef */
/* global process */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

 preview: {
  host: true,
  port: Number(process.env.PORT) || 3000,
  allowedHosts: ['frontend-production-2351.up.railway.app', '.up.railway.app'],
},

  server: {
    host: true,
    port: 5173,
    allowedHosts: ['all'],
  },
})