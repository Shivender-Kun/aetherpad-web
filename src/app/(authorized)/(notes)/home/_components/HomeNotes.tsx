import { MAX_PINNED_NOTES } from "@/constants/dataLimits";
import { INote } from "@/lib/types";
import { useAppSelector } from "@/store/hooks";
import React, { useCallback, useMemo } from "react";
import InfiniteList from "../../_components/InfiniteList";
import OrganizedNotes from "../../_components/organizer/OrganizedNotes";
import AddNote from "./AddNoteDialog";

type Props = {
  loadMore: () => void;
};

const HomeNotes = ({ loadMore }: Props) => {
  const {
    pinned: {
      data: { list: pinned },
    },
    unpinned: {
      data: { list: unpinned, hasMore },
    },
  } = useAppSelector((state) => state.notes);

  const renderNotes = useCallback(
    (title: string, notes: INote[]) => {
      const result = (
        <section
          className="flex flex-1 flex-col gap-4"
          aria-label={title + "notes"}
        >
          <header className="bg-background/90 sticky top-0 z-10 rounded-b-lg">
            <h3 className="p-2 text-lg font-semibold">
              {title} &nbsp;
              {title === "Pinned" && (
                <span className="text-sm text-gray-500">
                  You can pin upto {MAX_PINNED_NOTES} notes
                </span>
              )}
            </h3>
          </header>
          <div className="flex flex-1 gap-4 max-[668]:justify-center">
            <OrganizedNotes notes={notes} parentId="notes-container" />
          </div>
        </section>
      );

      return result;
    },
    [MAX_PINNED_NOTES],
  );

  const renderPinnedNotes = !!pinned.length && renderNotes("Pinned", pinned);

  const renderUnpinnedNotes = useMemo(
    () => !!unpinned.length && renderNotes("Unpinned", unpinned),
    [unpinned, renderNotes],
  );

  const renderNoNotes = (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-lg">
      <p className="text-center">
        Your thoughts, beautifully organized. Start your first note!
      </p>
      <div className="flex items-center gap-4">
        Add new note
        <AddNote />
      </div>
    </div>
  );

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
      <div
        id="notes-container"
        className="flex h-full min-h-fit w-full flex-col gap-8 p-1"
      >
        {renderPinnedNotes}
        {renderUnpinnedNotes}
        {!pinned.length && !unpinned.length && renderNoNotes}
        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default React.memo(HomeNotes);
