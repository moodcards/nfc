# Digital Business Card

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![next](https://img.shields.io/badge/next.js-14.0.0-black)
![react](https://img.shields.io/badge/react-18.0.0-blue)
![typescript](https://img.shields.io/badge/typescript-5.0.0-blue)
![tailwind](https://img.shields.io/badge/tailwind-3.3.0-06B6D4)

A modern digital business card built with Next.js App Router and React Server Components.

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.3
- **Components:** shadcn/ui
- **Motion:** Framer Motion 10.16
- **Icons:** Lucide Icons
- **Linting:** ESLint
- **Formatting:** Prettier
- **QR Code:** qrcode.react
- **Notifications:** react-hot-toast

## Development

From your terminal:

```bash
npm install
npm run dev
```

Project structure:
```
├── app/
│   ├── page.tsx           # Main card component
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── api/              # API routes
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## API

The project includes API routes for:
- `/api/wallet` - Apple Wallet pass generation

