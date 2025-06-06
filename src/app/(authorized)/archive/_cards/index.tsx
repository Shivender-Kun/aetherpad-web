"use client";

import OrganizeNotes from "@/components/layout/organizeNotes";
import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { INote, PaginatedData } from "@/types";
import { useStore } from "@/store";
import { useEffect } from "react";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setArchivedNotes, apiMessage, archivedNotes } = useStore();

  useEffect(() => {
    setArchivedNotes(props.notes);
  }, []);

  const fetchArchivedNotesList = async () => {
    const queries = `archived=true&page=1&limit=${DEFAULT_PAGINATION_LIMIT}`;
    try {
      const response = await axios.get(`${API.NOTES.GET_LIST}?${queries}`);
      if (response.status !== 200) throw Error(response.data.message);

      setArchivedNotes(response.data.data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
    }
  };

  useEffect(() => {
    if (apiMessage?.type === "success") fetchArchivedNotesList();
  }, [apiMessage]);

  return (
    <div
      className="flex flex-wrap gap-8 px-4 overflow-auto"
      id="notes-container"
    >
      <div className="flex flex-wrap gap-4 max-[668]:justify-center">
        <OrganizeNotes
          parentId="notes-container"
          notes={archivedNotes.list}
          itemWidth={304}
          gap={16}
        />
      </div>
    </div>
  );
};

export default NoteCards;
