"use client";

import Note from "@/app/(authorized)/_notes/Note";
import { INote, PaginatedData } from "@/types";
import { useStore } from "@/store";
import { API } from "@/constants";
import { useEffect } from "react";
import axios from "axios";

const NoteCards = (props: { notes: PaginatedData<INote> }) => {
  const { setNotes, apiMessage, notes, setAPIMessage } = useStore();

  useEffect(() => {
    setNotes(props.notes);
  }, []);

  const fetchNotesList = async () => {
    try {
      const response = await axios.get(API.NOTES.GET_LIST);
      if (response.status !== 200) throw Error(response.data.message);

      setNotes(response.data.data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
    }
  };

  useEffect(() => {
    if (apiMessage?.type === "success") fetchNotesList();
  }, [apiMessage]);

  return (
    <div className="flex flex-wrap gap-8 px-4 overflow-auto">
      {notes.list.map((note) => (
        <Note key={note._id} note={note} setAPIMessage={setAPIMessage} />
      ))}
    </div>
  );
};

export default NoteCards;
