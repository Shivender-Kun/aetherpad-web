import { DEFAULT_PAGINATION_LIMIT } from "@/constants";
import fetchNotes from "@/lib/api/fetchNotes";
import NoteCards from "./_cards";
import { Suspense } from "react";

const ArchivedNotes = async () => {
  const queries = `archived=true&page=1&limit=${DEFAULT_PAGINATION_LIMIT}`;
  const notes = await fetchNotes({ queries });

  return (
    <main className="flex flex-col gap-4 h-full">
      <div className="flex gap-4 justify-between px-4 h-9">
        <h2 className="text-xl">Archived Notes</h2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <NoteCards notes={notes} />
      </Suspense>
    </main>
  );
};

export default ArchivedNotes;
