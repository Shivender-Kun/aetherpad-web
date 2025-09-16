"use client";

import { INote, PaginatedData } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hydrateArchived,
  hydrateDeleted,
  hydratePinned,
  hydrateUnpinned,
} from "@/store/slices/notes";
import { useEffect } from "react";

interface NotesHydratorProps {
  pinned?: INote[];
  unpinned?: PaginatedData<INote>;
  archived?: PaginatedData<INote>;
  deleted?: PaginatedData<INote>;
}

export function NotesHydrator({
  pinned,
  unpinned,
  archived,
  deleted,
}: NotesHydratorProps) {
  const {
    pinned: { initialized: initializedPinned },
    unpinned: { initialized: initializedUnpinned },
    archived: { initialized: initializedArchived },
    deleted: { initialized: initializedDeleted },
  } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pinned && !initializedPinned) dispatch(hydratePinned(pinned));
    if (unpinned && !initializedUnpinned) dispatch(hydrateUnpinned(unpinned));
    if (archived && !initializedArchived) dispatch(hydrateArchived(archived));
    if (deleted && !initializedDeleted) dispatch(hydrateDeleted(deleted));
  }, [
    dispatch,
    pinned,
    unpinned,
    archived,
    deleted,
    initializedPinned,
    initializedUnpinned,
    initializedArchived,
    initializedDeleted,
  ]);

  return null;
}
