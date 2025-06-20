import { Archive, NotepadText, Tags, Trash2 } from "lucide-react";
import axios from "axios";

export { default as ENUM } from "./enum";
export { default as API } from "./api";

axios.defaults.withCredentials = true;

export const NODE_ENV = process.env.NODE_ENV;
export const DEBUG = process.env.NEXT_PUBLIC_DEBUG;

export const FIREBASE = {
  API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const APP = {
  NAME: "AetherPad",
  DEVELOPER_NAME: "Shivender-Kun",
  TAGLINE_HERO: "Your Ideas, Perfectly Captured.",
  SUB_TAGLINE_HERO:
    "Effortless, secure, and beautifully organized note-taking for everyone.",
  DESCRIPTION: "AetherPad app for private users.",
  DESCRIPTION_SEO:
    "Discover AetherPad, the intuitive app for capturing, organizing, and securing your thoughts. Enjoy a clean interface, custom labels, dark mode, PWA support, and more. Start boosting your productivity today!",
  URL: process.env.NEXT_PUBLIC_APP_URL,
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
} as const;

export const DEFAULT_PAGINATION_LIMIT = 10;
export const LABEL_ACTIONS = ["ADD", "UPDATE", "DELETE"] as const;

export const USER_ROUTES = [
  { name: "Notes", path: "/home", icon: NotepadText },
  { name: "Archive", path: "/archive", icon: Archive },
  { name: "Trash", path: "/trash", icon: Trash2 },
  { name: "Labels", path: "/labels", icon: Tags },
] as const;

export const PALETTE_OPTIONS = [
  "coral",
  "peach",
  "sand",
  "mint",
  "sage",
  "fog",
  "storm",
  "dusk",
  "blossom",
  "clay",
  "chalk",
] as const;

export const NOTE_ACTIONS = [
  "ADD",
  "UPDATE",
  "DELETE",
  "ARCHIVE",
  "UNARCHIVE",
  "PIN",
  "UNPIN",
  "RESTORE",
  "DELETE_PERMANENTLY",
] as const;
