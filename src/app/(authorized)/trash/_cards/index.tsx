"use client";

import { INote, PaginatedData } from "@/types";
import DeletedNote from "../../_notes/DeletedNote";
import { useStore } from "@/store";
import { API, DEFAULT_PAGINATION_LIMIT } from "@/constants";
import { useEffect } from "react";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setDeletedNotes, apiMessage, deletedNotes, setAPIMessage } =
    useStore();

  useEffect(() => {
    setDeletedNotes(props.notes);
  }, []);

  const fetchDeletedNotesList = async () => {
    try {
      const queries = `deleted=true&page=1&limit=${DEFAULT_PAGINATION_LIMIT}`;
      const response = await axios.get(`${API.NOTES.GET_LIST}?${queries}`);
      if (response.status !== 200) throw Error(response.data.message);

      setDeletedNotes(response.data.data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
    }
  };

  useEffect(() => {
    if (apiMessage?.type === "success") fetchDeletedNotesList();
  }, [apiMessage]);

  return (
    <div className="flex flex-wrap gap-8 px-4 overflow-auto">
      {deletedNotes.list.map((note) => (
        <DeletedNote key={note._id} note={note} setAPIMessage={setAPIMessage} />
      ))}
    </div>
  );
};

export default NoteCards;
