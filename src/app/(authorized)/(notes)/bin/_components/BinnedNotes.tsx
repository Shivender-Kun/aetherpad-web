"use client";

import { useAppSelector } from "@/store/hooks";
import React from "react";
import InfiniteList from "../../_components/InfiniteList";
import OrganizedBinnedNotes from "../../_components/organizer/OrganizedBinnedNotes";

type Props = {
  loadMore: () => void;
};

const BinnedNotes = ({ loadMore }: Props) => {
  const { list: binnedNotes, hasMore } = useAppSelector(
    (state) => state.notes.binned.data,
  );

  const renderNoNotes = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-lg">
        Nothing in the bin. Binned notes are held here before permanent removal.
      </p>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div
        id="notes-container"
        className="flex h-full w-full flex-col gap-8 overflow-x-hidden p-1"
      >
        {binnedNotes.length ? (
          <div className="flex flex-1 gap-4 max-[668]:justify-center">
            <OrganizedBinnedNotes
              parentId="notes-container"
              notes={binnedNotes}
            />
          </div>
        ) : (
          renderNoNotes
        )}

        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default React.memo(BinnedNotes);
