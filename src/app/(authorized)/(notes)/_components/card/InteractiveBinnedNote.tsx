"use client";

import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { useState } from "react";
import DeleteButton from "../buttons/DeleteButton";
import RestoreButton from "../buttons/RestoreButton";
import NoteCard from "./Note";

type Props = {
  /** Note data */
  note: INote;
  /** Note external click handler, receives action type. Actions :-
   * - Pin/Unpin
   * - Archive/Unarchive
   * - Move to bin
   * - Edit Note
   */
  handleNoteClick: (type: NOTE_ACTION) => void;
  /** Available width per note */
  availableItemWidth: number;
};

const InteractiveBinnedNote = ({
  note,
  handleNoteClick,
  availableItemWidth,
}: Props) => {
  const [hoverActive, setHoverActive] = useState(false);

  /** Note restore button click handler */
  const handleRestoreClick = () => {
    handleNoteClick(NOTE_ACTION.RESTORE);
  };

  /** Note delete button click handler */
  const handleDeleteClick = () => {
    handleNoteClick(NOTE_ACTION.DELETE);
  };

  const FooterOptions = (
    <div
      className="flex w-full justify-between gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <RestoreButton onClick={handleRestoreClick} />
      <DeleteButton onClick={handleDeleteClick} />
    </div>
  );

  const cardArgs = {
    note,
    FooterOptions,
    hoverActive,
    availableItemWidth,
    onMouseEnter: () => setHoverActive(true),
    onMouseLeave: () => setHoverActive(false),
  };

  return <NoteCard key={note._id} {...cardArgs} />;
};

export default InteractiveBinnedNote;
