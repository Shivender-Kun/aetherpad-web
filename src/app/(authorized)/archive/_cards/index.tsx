"use client";

import OrganizeNotes from "@/components/layout/organizeNotes";
import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { INote, PaginatedData } from "@/types";
import { useStore } from "@/store";
import { useCallback, useEffect } from "react";
import errorHandler from "@/lib/errorHandler";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setArchivedNotes, apiMessage, archivedNotes } = useStore();

  useEffect(() => {
    setArchivedNotes(props.notes);
  }, [setArchivedNotes, props.notes]);

  const fetchArchivedNotesList = useCallback(async () => {
    errorHandler({
      apiCall: async () => {
        const queries = `archived=true&page=1&limit=${DEFAULT_PAGINATION_LIMIT}`;
        const response = await axios.get(`${API.NOTES.GET_LIST}?${queries}`);
        if (response.status !== 200) throw Error(response.data.message);
        setArchivedNotes(response.data.data);
      },
    });
  }, [setArchivedNotes]);

  useEffect(() => {
    if (apiMessage?.type === "success") fetchArchivedNotesList();
  }, [apiMessage, fetchArchivedNotesList]);

  const renderNoNotes = (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <p className="text-lg text-center">
        Your digital attic is empty. Archive notes to store them safely.
      </p>
    </div>
  );

  return (
    <div
      className="flex flex-wrap gap-8 px-4 overflow-auto h-full"
      id="notes-container"
    >
      {!!archivedNotes.list.length && (
        <div className="flex flex-wrap gap-4 max-[668]:justify-center">
          <OrganizeNotes
            parentId="notes-container"
            notes={archivedNotes.list}
            itemWidth={304}
            gap={16}
          />
        </div>
      )}

      {!archivedNotes.list.length && renderNoNotes}
    </div>
  );
};

export default NoteCards;
