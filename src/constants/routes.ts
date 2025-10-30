import { UserRouteType } from "@/lib/types/routes";
import {
  Archive,
  BookOpen,
  GlobeLock,
  NotepadText,
  ReceiptText,
  Tags,
  Trash2,
} from "lucide-react";

export const NOTES_USER_ROUTES: readonly UserRouteType[] = [
  { name: "Active", path: "/home", icon: NotepadText },
  { name: "Archive", path: "/archive", icon: Archive },
  { name: "Bin", path: "/bin", icon: Trash2 },
];

export const LEGAL_ROUTES: readonly UserRouteType[] = [
  { name: "About Us", path: "/about", icon: BookOpen },
  { name: "Privacy Policy", path: "/privacy", icon: GlobeLock },
  { name: "Terms of Use", path: "/terms", icon: ReceiptText },
];

export const LABELS_USER_ROUTES: readonly UserRouteType[] = [
  { name: "Labels", path: "/labels", icon: Tags },
];
