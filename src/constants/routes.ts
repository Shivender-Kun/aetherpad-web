import { UserRouteType } from "@/lib/types/routes";
import { Archive, NotepadText, Tags, Trash2 } from "lucide-react";

export const USER_ROUTES: readonly UserRouteType[] = [
  { name: "Notes", path: "/home", icon: NotepadText },
  { name: "Archive", path: "/archive", icon: Archive },
  { name: "Trash", path: "/trash", icon: Trash2 },
  { name: "Labels", path: "/labels", icon: Tags },
];
