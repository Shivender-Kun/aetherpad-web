"use client";

import PermanentDeleteNote from "@/app/(authorized)/trash/_delete";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ArchiveRestore } from "lucide-react";
import noteAction from "@/lib/api/noteAction";
import NoteCard from "@/components/card/note";
import { NOTE_ACTIONS } from "@/constants";
import { useStore } from "@/store";
import { useState } from "react";
import { INote } from "@/types";

const DeletedNote = ({ note }: { note: INote }) => {
  const [hoverActive, setHoverActive] = useState(false);
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);
  const { isLoading, setAPIMessage, setIsLoading } = useStore();

  const handleCardAction = async (
    action: "DELETE_PERMANENTLY" | "RESTORE",
    data?: { [key: string]: string }
  ) => {
    await noteAction({
      id: note._id,
      action,
      data,
      setIsLoading,
      setAPIMessage,
    });
  };

  const FooterOptions = (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
        <Popover>
          <PopoverTrigger
            title="Restore"
            className="rounded-full w-7 h-7 cursor-pointer flex items-center justify-center"
            onClick={() => handleCardAction(NOTE_ACTIONS[7])}
          >
            <ArchiveRestore />
          </PopoverTrigger>
        </Popover>

        <PermanentDeleteNote
          note={note}
          deleteNote={() => handleCardAction(NOTE_ACTIONS[8])}
          isLoading={isLoading}
          open={deleteDialogShow}
          onOpenChange={setDeleteDialogShow}
        />
      </div>
    </div>
  );

  return (
    <NoteCard
      key={note._id}
      {...{
        note,
        FooterOptions,
        showOptions: hoverActive,
        cardEvents: {
          onMouseEnter: () => setHoverActive(true),
          onMouseLeave: () => setHoverActive(false),
        },
      }}
    />
  );
};

export default DeletedNote;
