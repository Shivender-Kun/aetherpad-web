"use client";

import { INote, PaginatedData } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hydrateArchived,
  hydrateBinned,
  hydratePinned,
  hydrateUnpinned,
} from "@/store/slices/notes";
import { useEffect } from "react";

interface NotesHydratorProps {
  pinned?: INote[];
  unpinned?: PaginatedData<INote>;
  archived?: PaginatedData<INote>;
  binned?: PaginatedData<INote>;
}

export function NotesHydrator({
  pinned,
  unpinned,
  archived,
  binned,
}: NotesHydratorProps) {
  const {
    pinned: { initialized: initializedPinned },
    unpinned: { initialized: initializedUnpinned },
    archived: { initialized: initializedArchived },
    binned: { initialized: initializedBinned },
  } = useAppSelector((state) => state.notes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pinned && !initializedPinned) dispatch(hydratePinned(pinned));
    if (unpinned && !initializedUnpinned) dispatch(hydrateUnpinned(unpinned));
    if (archived && !initializedArchived) dispatch(hydrateArchived(archived));
    if (binned && !initializedBinned) dispatch(hydrateBinned(binned));
  }, [
    dispatch,
    pinned,
    unpinned,
    archived,
    binned,
    initializedPinned,
    initializedUnpinned,
    initializedArchived,
    initializedBinned,
  ]);

  return null;
}
