# AetherPad

AetherPad is a privacy-focused, full-stack note-taking application built with [Next.js](https://nextjs.org/), TypeScript, and Tailwind CSS. It features user authentication, note and label management, a responsive sidebar, and a modern UI.

---

## Features

- **User Authentication:** Secure login and session management.
- **Notes Management:** Create, edit, and delete AetherPad.
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
personal-notes/
├── .env
├── public/
├── src/
│   ├── api/           # API utilities (e.g. [src/api/fetchUser.ts](src/api/fetchUser.ts))
│   ├── app/           # Next.js app directory (routing, layouts, pages)
│   ├── assets/        # Static assets
│   ├── components/    # Reusable UI components (e.g. [src/components/ui/sidebar.tsx](src/components/ui/sidebar.tsx))
│   ├── constants/     # App-wide constants (e.g. [src/constants/index.ts](src/constants/index.ts))
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions (e.g. [src/lib/utils.ts](src/lib/utils.ts))
│   ├── services/      # Service layer (API calls, business logic)
│   └── types/         # TypeScript types ([src/types/index.ts](src/types/index.ts))
├── tailwind.config.ts # Tailwind CSS configuration
├── next.config.ts     # Next.js configuration
├── package.json
└── README.md
```

---

## Key Files

- **API Utilities:**

  - [`src/api/fetchUser.ts`](src/api/fetchUser.ts) – Fetches authenticated user details.
  - [`src/api/fetchList.ts`](src/api/fetchList.ts) – Fetches paginated lists (notes, labels).
  - [`src/api/deleteDoc.ts`](src/api/deleteDoc.ts) – Deletes notes or labels.

- **UI Components:**

  - [`src/components/ui/sidebar.tsx`](src/components/ui/sidebar.tsx) – Sidebar and related UI.
  - [`src/components/ui/table.tsx`](src/components/ui/table.tsx) – Table components for displaying lists.
  - [`src/components/ui/button.tsx`](src/components/ui/button.tsx) – Button component with variants.
  - [`src/components/ui/input.tsx`](src/components/ui/input.tsx) – Input field component.

- **Constants:**

  - [`src/constants/index.ts`](src/constants/index.ts) – App constants and configuration.
  - [`src/constants/enum.ts`](src/constants/enum.ts) – Enum definitions for actions.

- **Types:**

  - [`src/types/index.ts`](src/types/index.ts) – TypeScript interfaces for User, Note, Label, etc.

- **Store:**
  - [`src/store/index.tsx`](src/store/index.tsx) – React context for global state management.

---

## Customization

- **Theming:**  
  Edit [`src/app/globals.css`](src/app/globals.css) and [`tailwind.config.ts`](tailwind.config.ts) to adjust colors, spacing, and design tokens.

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

See [src/app/(legal)/privacy/page.tsx](<src/app/(legal)/privacy/page.tsx>) for privacy policy details.

---

## License

MIT

---

> Bootstrapped with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
