"use client";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { INote, StoreContextType } from "@/types";
import noteAction from "@/lib/api/noteAction";
import NoteCard from "@/components/card/note";
import { NOTE_ACTIONS } from "@/constants";
import { useState } from "react";

const DeletedNote = ({
  note,
  setAPIMessage,
}: {
  note: INote;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
}) => {
  const [hoverActive, setHoverActive] = useState(false);

  const handleCardAction = (
    action: "DELETE_PERMANENTLY" | "RESTORE",
    data?: { [key: string]: string }
  ) => {
    noteAction({
      id: note._id,
      action,
      data,
      setAPIMessage,
    });
  };

  const FooterOptions = (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
        <Popover>
          <PopoverTrigger
            title="Restore"
            className="rounded-full w-7 h-7 cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              handleCardAction(NOTE_ACTIONS[7]);
            }}
          >
            <ArchiveRestore />
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger
            title={"Delete Permanently"}
            className="rounded-full w-7 h-7 cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              handleCardAction(NOTE_ACTIONS[8]);
            }}
          >
            <Trash2 />
          </PopoverTrigger>
        </Popover>
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
