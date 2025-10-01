import { UserRouteType } from "@/lib/types/routes";
import { Archive, NotepadText, Trash2 } from "lucide-react";

export const USER_ROUTES: readonly UserRouteType[] = [
  { name: "Active", path: "/home", icon: NotepadText },
  { name: "Archive", path: "/archive", icon: Archive },
  { name: "Bin", path: "/bin", icon: Trash2 },
  // { name: "Labels", path: "/labels", icon: Tags },
];
