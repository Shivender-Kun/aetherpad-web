import API_ENDPOINTS from "./api";
import { NEXT_PUBLIC_ENV } from "./env";

const BASE_URL = `/api/${NEXT_PUBLIC_ENV.API_VERSION}`; // Format http:localhost:3000/api/v1

export const API = API_ENDPOINTS(BASE_URL);

export const APP = {
  NAME: "AetherPad",
  DEVELOPER_NAME: "Shivender-Kun",
  TAGLINE_HERO: "Your Ideas, Perfectly Captured.",
  SUB_TAGLINE_HERO:
    "Effortless, secure, and beautifully organized note-taking for everyone.",
  DESCRIPTION: "AetherPad app for private users.",
  DESCRIPTION_SEO:
    "Discover AetherPad, the intuitive app for capturing, organizing, and securing your thoughts. Enjoy a clean interface, custom labels, dark mode, PWA support, and more. Start boosting your productivity today!",
  URL: NEXT_PUBLIC_ENV.APP_URL,
  VERSION: NEXT_PUBLIC_ENV.APP_VERSION,
  CONTACT_EMAIL: NEXT_PUBLIC_ENV.CONTACT_EMAIL,
} as const;
