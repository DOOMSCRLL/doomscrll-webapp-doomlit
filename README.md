# DOOMSCRLL Creator Webapp (DOOMLIT Portal)

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/SvelteKit-2.0-FF3E00.svg)](https://kit.svelte.dev/)
[![Svelte](https://img.shields.io/badge/Svelte-v5-FF3E00.svg)](https://svelte.dev/)
[![Styling](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Cloudflare-Workers-F38020.svg)](https://workers.cloudflare.com/)

This repository powers the creator dashboard webapp for the **DOOMSCRLL** ecosystem, hosted live at [https://doomlit.doomscrll.com](https://doomlit.doomscrll.com).

---

## 🌐 DOOMSCRLL Open Source Ecosystem

- **Creator Webapp** (`doomscrll-webapp-doomlit`) — _You are here_
- **Backend API** (`doomscrll-backend`) — Fastify 5 REST API & PostgreSQL schema
- **Landing Website** (`doomscrll-landing-website`) — Astro public portal
- **Audience Webapp** (`doomscrll-webapp-audience`) — SvelteKit 2 showcase & discovery feed
- **Audience Mobile App** (`doomscrll_app_audience`) — Cross-platform Flutter MVVM mobile app

---

## 1. Tech Stack & Key Features

- **SvelteKit 2 & Svelte 5**: Modern creator portal powered by Svelte 5 Runes for ultra-responsive form state management.
- **Tailwind CSS v4**: Utility-first design system styled via `@tailwindcss/vite`.
- **Cloudflare Workers Adapter**: Deployed natively to Cloudflare Edge Network using `@sveltejs/adapter-cloudflare`.
- **24-Hour Slot Reservation Workflow**: Interactive calendar date selector for reserving daily DOOMLIT showcase slots.
- **100% Free Launch Event Route**: Direct `POST ?/claimFree` action allowing creators to bypass payment checkout during launch events.
- **Pre-signed Cloudflare R2 Upload Broker**: Secure, direct client-to-CDN image uploads using time-limited presigned URLs.
- **Client-Side Image Optimization**: WASM-powered in-browser image resizing and `.webp` compression via `@jsquash/webp` and `@jsquash/resize`.
- **Auto-Save Project Form**: Real-time autosave form persistence with localized EN/TR error feedback.

---

## 2. Quick Start & Development

### Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Commands

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment Variables**:

   ```bash
   cp .env.example .env
   ```

   Set `API_BASE_URL` to your local or staging backend API (`http://127.0.0.1:3000`).

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` in your browser.

4. **Run Type Checks & Svelte Diagnostics**:

   ```bash
   npm run check
   ```

5. **Build for Production**:

   ```bash
   npm run build
   ```

6. **Deploy to Cloudflare Workers**:

   ```bash
   npm run deploy
   ```

7. **Launch Storybook Playground**:
   ```bash
   npm run storybook
   ```

---

## 📄 License & Trademark Notice

- **Code License**: Source code is licensed under the [Apache License, Version 2.0](LICENSE).
- **Trademark Policy**: The **DOOMSCRLL** name, logos, brand identity, and custom design assets are reserved trademarks. See [TRADEMARK.md](TRADEMARK.md) for usage policy and rebranding guidelines for forks.
