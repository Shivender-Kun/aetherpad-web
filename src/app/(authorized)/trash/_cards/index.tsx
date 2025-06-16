"use client";

import OrganizeNotes from "@/components/layout/organizeNotes";
import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { INote, PaginatedData } from "@/types";
import { useCallback, useEffect } from "react";
import errorHandler from "@/lib/errorHandler";
import { useStore } from "@/store";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setDeletedNotes, apiMessage, deletedNotes } = useStore();

  useEffect(() => {
    setDeletedNotes(props.notes);
  }, [setDeletedNotes, props.notes]);

  const fetchDeletedNotesList = useCallback(async () => {
    errorHandler({
      apiCall: async () => {
        const queries = `deleted=true&page=1&limit=${DEFAULT_PAGINATION_LIMIT}`;
        const response = await axios.get(`${API.NOTES.GET_LIST}?${queries}`);
        if (response.status !== 200) throw Error(response.data.message);
        setDeletedNotes(response.data.data);
      },
    });
  }, [setDeletedNotes]);

  useEffect(() => {
    if (apiMessage?.type === "success") fetchDeletedNotesList();
  }, [apiMessage, fetchDeletedNotesList]);

  const renderNoNotes = (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <p className="text-lg text-center">
        Nothing in the trash. Deleted notes are held here before permanent
        removal.
      </p>
    </div>
  );

  return (
    <div
      className="flex flex-wrap gap-8 px-4 overflow-auto h-full"
      id="notes-container"
    >
      {!!deletedNotes.list.length && (
        <div className="flex flex-wrap gap-4 max-[668]:justify-center">
          <OrganizeNotes
            parentId="notes-container"
            notes={deletedNotes.list}
            itemWidth={304}
            gap={16}
            isDeletedList
          />
        </div>
      )}

      {!deletedNotes.list.length && renderNoNotes}
    </div>
  );
};

export default NoteCards;
