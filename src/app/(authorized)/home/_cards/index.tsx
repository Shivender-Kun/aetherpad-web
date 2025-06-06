"use client";

import OrganizeNotes from "@/components/layout/organizeNotes";
import { INote, PaginatedData } from "@/types";
import { useStore } from "@/store";
import { API } from "@/constants";
import { useCallback, useEffect } from "react";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setNotes, apiMessage, notes, setPinnedNotes, pinnedNotes } =
    useStore();

  const splitNotes = (notes: INote[]) => {
    const pinned = notes.filter((note) => note.isPinned);
    const unpinned = notes.filter((note) => !note.isPinned);
    return { pinned, unpinned };
  };

  const fetchNotesList = useCallback(async () => {
    try {
      const response = await axios.get(API.NOTES.GET_LIST);
      if (response.status !== 200) throw Error(response.data.message);

      const { pinned, unpinned } = splitNotes(response.data.data.list);
      setPinnedNotes(pinned);
      setNotes({ ...props.notes, list: unpinned });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
    }
  }, [props.notes, setNotes, setPinnedNotes]);

  useEffect(() => {
    if (props.notes) {
      const { pinned, unpinned } = splitNotes(props.notes.list);
      setPinnedNotes(pinned);
      setNotes({ ...props.notes, list: unpinned });
    }
  }, [props.notes, setNotes, setPinnedNotes]);

  useEffect(() => {
    if (apiMessage?.type === "success") fetchNotesList();
  }, [apiMessage, fetchNotesList]);

  const renderNotes = (title: string, notes: INote[]) => {
    return (
      <section className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold pl-4">{title}</h3>
        <div className="flex flex-wrap gap-4 max-[668]:justify-center">
          <OrganizeNotes
            parentId="notes-container"
            notes={notes}
            itemWidth={304}
            gap={16}
          />
        </div>
      </section>
    );
  };

  return (
    <div className="px-4 overflow-auto h-full">
      <div id="notes-container" className="flex flex-col gap-8">
        {pinnedNotes &&
          pinnedNotes.length > 0 &&
          renderNotes("Pinned", pinnedNotes)}

        {renderNotes("Others", notes.list)}
      </div>
    </div>
  );
};

export default NoteCards;
