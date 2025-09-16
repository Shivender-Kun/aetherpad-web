"use client";

import { useAppSelector } from "@/store/hooks";
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
        className="flex h-full w-full flex-col gap-8 pr-2"
      >
        {!!archivedNotes.length && (
          <div className="flex flex-wrap gap-4 max-[668]:justify-center">
            <OrganizedNotes parentId="notes-container" notes={archivedNotes} />
          </div>
        )}

        {!archivedNotes.length && renderNoNotes}
        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default ArchivedNotes;
