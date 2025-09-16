import { MAX_PINNED_NOTES } from "@/constants/dataLimits";
import { INote } from "@/lib/types";
import { useAppSelector } from "@/store/hooks";
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
      data: { list: unpinned, page, hasMore },
    },
  } = useAppSelector((state) => state.notes);

  const renderNotes = (title: string, notes: INote[]) => {
    return (
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
  };

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
    <div className="flex flex-1 flex-col overflow-auto">
      <div
        id="notes-container"
        className="flex h-full min-h-fit w-full flex-col gap-8 overflow-x-hidden p-1"
      >
        {!!pinned.length && renderNotes("Pinned", pinned)}
        {!!unpinned.length && renderNotes("Unpinned", unpinned)}
        {!pinned.length && !unpinned.length && renderNoNotes}
        {hasMore && <InfiniteList cb={loadMore} />}
      </div>
    </div>
  );
};

export default HomeNotes;
