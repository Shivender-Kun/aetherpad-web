"use client";

import { INote, PaginatedData } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  hydrateArchived,
  hydrateBinned,
  hydratePinned,
  hydrateUnpinned,
} from "@/store/slices/notes";
import React, { useEffect, useRef } from "react";

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

  // Track what was hydrated in this component instance
  const hydratedRef = useRef({
    pinned: false,
    unpinned: false,
    archived: false,
    binned: false,
  });

  useEffect(() => {
    if (pinned && !initializedPinned && !hydratedRef.current.pinned) {
      dispatch(hydratePinned(pinned));
      hydratedRef.current.pinned = true;
    }
  }, [dispatch, pinned, initializedPinned]);

  useEffect(() => {
    if (unpinned && !initializedUnpinned && !hydratedRef.current.unpinned) {
      dispatch(hydrateUnpinned(unpinned));
      hydratedRef.current.unpinned = true;
    }
  }, [dispatch, unpinned, initializedUnpinned]);

  useEffect(() => {
    if (archived && !initializedArchived && !hydratedRef.current.archived) {
      dispatch(hydrateArchived(archived));
      hydratedRef.current.archived = true;
    }
  }, [dispatch, archived, initializedArchived]);

  useEffect(() => {
    if (binned && !initializedBinned && !hydratedRef.current.binned) {
      dispatch(hydrateBinned(binned));
      hydratedRef.current.binned = true;
    }
  }, [dispatch, binned, initializedBinned]);

  return null;
}

export default React.memo(NotesHydrator);
