/* eslint-disable no-undef */
/* global process */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  preview: {
    host: true,
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    hostAllowance: 'all',
  },

  server: {
    host: true,
    port: 3000,
    hostAllowance: 'all',
  },
})