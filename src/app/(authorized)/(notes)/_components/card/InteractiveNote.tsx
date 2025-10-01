"use client";

import { INote } from "@/lib/types";
import { NOTE_ACTION, NOTE_STATUS } from "@/lib/types/enums";
import { useAppDispatch } from "@/store/hooks";
import { optimisticNoteUpdate, updateNote } from "@/store/slices/notes";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ArchiveUnarchiveButton from "../buttons/ArchiveUnarchiveButton";
import TrashButton from "../buttons/BinButton";
import PaletteButton from "../buttons/PaletteButton";
import PinUnpinButton from "../buttons/PinUnpinButton";
import PaletteOptions from "../PaletteOptions";
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

const InteractiveNote = ({
  note,
  handleNoteClick,
  availableItemWidth,
}: Props) => {
  const [hoverActive, setHoverActive] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const dispatch = useAppDispatch();
  const { status } = note;

  /** Note pin/unpin button click handler */
  const handlePinUnpinClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const actionId = uuidv4();
    dispatch(
      optimisticNoteUpdate({
        actionId,
        noteAction: note.isPinned ? NOTE_ACTION.UNPIN : NOTE_ACTION.PIN,
        note,
      }),
    );
    dispatch(
      updateNote({
        actionId,
        id: note._id,
        action: note.isPinned ? NOTE_ACTION.UNPIN : NOTE_ACTION.PIN,
      }),
    );
  };

  /** Note archive/unarchive button click handler */
  const handleArchiveUnarchiveClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    handleNoteClick(
      status === NOTE_STATUS.ARCHIVED
        ? NOTE_ACTION.UNARCHIVE
        : NOTE_ACTION.ARCHIVE,
    );
  };

  /** Note palette button click handler */
  const handlePaletteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setShowPalette((prev) => !prev);
  };

  /** Note bin button click handler */
  const handleTrashClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    handleNoteClick(NOTE_ACTION.BIN);
  };

  /** Note color click handler */
  const handlePaletteColorClick = (bgColor: string) => {
    const actionId = uuidv4();
    const action = NOTE_ACTION.BACKGROUND;

    dispatch(
      optimisticNoteUpdate({
        actionId,
        noteAction: action,
        note,
        data: { bgColor },
      }),
    );
    dispatch(
      updateNote({
        actionId,
        id: note._id,
        action,
        data: { bgColor },
      }),
    );
  };

  /** Note floating header options component */
  const HeaderOptions =
    status === NOTE_STATUS.ARCHIVED ? null : (
      <PinUnpinButton isPinned={note.isPinned} onClick={handlePinUnpinClick} />
    );

  /** Note footer options component */
  const FooterOptions = (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full justify-between gap-4">
        <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
          {status !== NOTE_STATUS.ARCHIVED && (
            <PaletteButton onClick={handlePaletteClick} />
          )}
          <ArchiveUnarchiveButton
            isArchived={status === NOTE_STATUS.ARCHIVED}
            onClick={handleArchiveUnarchiveClick}
          />
        </div>
        <TrashButton onClick={handleTrashClick} />
      </div>
      {status !== NOTE_STATUS.ARCHIVED && showPalette && (
        <PaletteOptions onClick={handlePaletteColorClick} />
      )}
    </div>
  );

  const cardArgs = {
    note,
    HeaderOptions,
    FooterOptions,
    hoverActive,
    availableItemWidth,
    onMouseEnter: () => setHoverActive(true),
    onMouseLeave: () => {
      setHoverActive(false);
      setShowPalette(false);
    },
    onClick: () =>
      status !== NOTE_STATUS.ARCHIVED && handleNoteClick(NOTE_ACTION.UPDATE),
  };

  return <NoteCard {...cardArgs} />;
};

export default InteractiveNote;
