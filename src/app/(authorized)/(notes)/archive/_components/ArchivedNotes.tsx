"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import InfiniteList from "../../_components/InfiniteList";
import OrganizedNotes from "../../_components/organizer/OrganizedNotes";

type Props = {
  loadMore: () => void;
};
const ArchivedNotes = ({ loadMore }: Props) => {
  const { list: archivedNotes, hasMore } = useAppSelector(
    (state) => state.notes.archived.data,
  );

  const renderNoNotes = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-lg">
        Your digital attic is empty. Archive notes to store them safely.
      </p>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div
        id="notes-container"
        className="flex h-full w-full flex-col gap-8 overflow-x-hidden p-1"
      >
        {archivedNotes.length ? (
          <div className="flex h-full gap-4 overflow-x-hidden max-[668]:justify-center">
            <OrganizedNotes parentId="notes-container" notes={archivedNotes} />
          </div>
        ) : (
          renderNoNotes
        )}
        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default React.memo(ArchivedNotes);
