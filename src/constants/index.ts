import axios from "axios";
import { Archive, NotepadText, Tags, Trash2 } from "lucide-react";

export { default as API } from "./api";
export { default as ENUM } from "./enum";

axios.defaults.withCredentials = true;

export const FIREBASE = {
  API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const APP = {
  NAME: "Personal Notes",
  DESCRIPTION: "Personal notes app for private users.",
  URL: process.env.NEXT_PUBLIC_APP_URL,
  VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
};

export const DEFAULT_PAGINATION_LIMIT = 10;

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

export const LABEL_ACTIONS = ["ADD", "UPDATE", "DELETE"] as const;
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
