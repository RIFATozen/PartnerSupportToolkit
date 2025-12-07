# 🚀 Partner Support Toolkit 
**Live Demo:** https://partner-support-toolkit.vercel.app

A modern embeddable **feedback collection widget** paired with a **multi-tenant admin dashboard**. The widget can be embedded on any website via a single script tag and securely sends feedback to Supabase. The dashboard is a Next.js 16 application for partner authentication, management, and viewing feedback data.

## Monorepo Structure

- **widget/** — React embeddable widget
  - Dev via Vite, production bundle via Rollup (IIFE)
  - Shadow DOM isolation, TypeScript, Tailwind (PostCSS)
- **dashboard/** — Next.js admin dashboard
  - Tailwind v4, Supabase SSR helpers

## Features

- **Embeddable Widget** with Shadow DOM (isolated styles)
- **TypeScript + React** developer experience
- **Next.js Dashboard** for authentication and feedbacks
- **Supabase** integration for data storage

## Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm

---

## 1) Widget

The widget is designed to be hosted on a CDN or any static host and embedded on partner websites.

### Embed Snippet (Production)

Place this near the end of `<body>` on the consumer site:

```html
<script
  async
  src="https://partner-support-toolkit.vercel.app/widget.js"
  data-client-key="YOUR_PARTNER_KEY">
</script>
```

- The widget reads `data-client-key` from the script tag. Make sure to provide the client key.

---

## 2) Dashboard

A full-featured Next.js app for partner authentication and viewing stored feedback.