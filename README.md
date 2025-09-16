# AetherPad

AetherPad is a privacy-focused, full-stack note-taking application built with [Next.js](https://nextjs.org/), TypeScript, and Tailwind CSS. It features user authentication, note and label management, a responsive sidebar, and a modern UI.

---

## Features

- **User Authentication:** Secure login and session management.
- **Notes Management:** Create, edit, archive, and delete notes.
- **Labels:** Organize notes with custom labels. Add, edit, and delete labels.
- **Responsive Sidebar:** Collapsible sidebar with keyboard shortcuts and theming.
- **Modern UI:** Built with Radix UI, Tailwind CSS, and custom components.
- **API Integration:** Uses RESTful APIs for all data operations.
- **Theming:** Light and dark mode support.
- **PWA Ready:** Installable and mobile-friendly.
- **Privacy:** No data selling, secure storage, and user-focused privacy.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
client-web/
├── .env
├── public/
│   ├── icons/
│   ├── images/
│   └── screenshots/
├── src/
│   ├── app/                # Next.js app directory (routing, layouts, pages)
│   │   ├── (authentication)/  # Auth pages (signin, signup, reset, etc.)
│   │   ├── (authorized)/      # Protected app pages (notes, labels, profile)
│   │   ├── (legal)/          # Legal pages (privacy, terms, about)
│   │   └── _components/      # Landing and layout components
│   ├── api/               # API route handlers (Next.js API routes)
│   ├── components/        # Reusable UI components (UI, logo, theme, store)
│   ├── constants/         # App-wide constants (API, env, routes, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and API clients
│   ├── services/          # Service layer (API calls, business logic)
│   ├── store/             # Global state management (Redux slices, hooks)
│   ├── styles/            # Global styles (Tailwind CSS)
│   └── types/             # TypeScript types and enums
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
├── package.json
└── README.md
```

---

## Key Files & Folders

- **API Utilities:**
  - [`src/lib/api/labels/client.ts`](src/lib/api/labels/client.ts) – Client-side label API functions.
  - [`src/lib/api/notes/client.ts`](src/lib/api/notes/client.ts) – Client-side note API functions.
  - [`src/lib/api/user/client.ts`](src/lib/api/user/client.ts) – Client-side user API functions.

- **UI Components:**
  - [`src/components/ui/sidebar.tsx`](src/components/ui/sidebar.tsx) – Sidebar and related UI.
  - [`src/components/ui/table.tsx`](src/components/ui/table.tsx) – Table components for displaying lists.
  - [`src/components/ui/button.tsx`](src/components/ui/button.tsx) – Button component with variants.
  - [`src/components/ui/input.tsx`](src/components/ui/input.tsx) – Input field component.

- **Constants:**
  - [`src/constants/api.ts`](src/constants/api.ts) – API endpoint definitions.
  - [`src/constants/env.ts`](src/constants/env.ts) – Environment variable keys.
  - [`src/constants/routes.ts`](src/constants/routes.ts) – Route definitions.

- **Types:**
  - [`src/types/index.ts`](src/types/index.ts) – TypeScript interfaces for User, Note, Label, etc.
  - [`src/types/enums.ts`](src/types/enums.ts) – Enum definitions.

- **Store:**
  - [`src/store/index.tsx`](src/store/index.tsx) – React context for global state management.
  - [`src/store/slices/`](src/store/slices/) – Redux slices for notes, labels, user, etc.

- **Landing & Layout Components:**
  - [`src/app/_components/landing/`](src/app/_components/landing/) – Landing page sections (Hero, Features, etc.).
  - [`src/app/_components/layout/Footer.tsx`](src/app/_components/layout/Footer.tsx) – App footer.

---

## Customization

- **Theming:**  
  Edit [`src/styles/globals.css`](src/styles/globals.css) and [`tailwind.config.ts`](tailwind.config.ts) to adjust colors, spacing, and design tokens.

- **API Endpoints:**  
  Update API URLs in [`src/constants/api.ts`](src/constants/api.ts) as needed.

- **Environment Variables:**  
  Configure your `.env` file for API keys and environment-specific settings.

---

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) for best results.

For more, see [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

## Privacy

See [`src/app/(legal)/privacy/page.tsx`](<src/app/(legal)/privacy/page.tsx>) for privacy policy details.

---

## License

MIT

---

> Bootstrapped with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
