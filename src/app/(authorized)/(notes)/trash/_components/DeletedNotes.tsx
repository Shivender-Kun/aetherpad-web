"use client";

import { useAppSelector } from "@/store/hooks";
import InfiniteList from "../../_components/InfiniteList";
import OrganizedDeletedNotes from "../../_components/organizer/OrganizedDeletedNotes";

type Props = {
  loadMore: () => void;
};

const DeletedNotes = ({ loadMore }: Props) => {
  const { list: deletedNotes, hasMore } = useAppSelector(
    (state) => state.notes.deleted.data,
  );

  const renderNoNotes = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-lg">
        Nothing in the trash. Deleted notes are held here before permanent
        removal.
      </p>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div
        id="notes-container"
        className="flex h-full w-full flex-col gap-8 overflow-x-hidden p-1"
      >
        {!!deletedNotes.length && (
          <div className="flex flex-1 gap-4 max-[668]:justify-center">
            <OrganizedDeletedNotes
              parentId="notes-container"
              notes={deletedNotes}
            />
          </div>
        )}

        {!deletedNotes.length && renderNoNotes}
        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default DeletedNotes;
