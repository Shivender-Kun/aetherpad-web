"use client";

import {
  Archive,
  ArchiveRestore,
  EllipsisVertical,
  Palette,
  Pin,
  PinOff,
  Tags,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { INote, StoreContextType } from "@/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { NOTE_ACTIONS, PALETTE_OPTIONS } from "@/constants";
import NoteCard from "@/components/NoteCard";
import DeleteNote from "../../home/_delete";
import EditNote from "../../home/_edit";
import { useState } from "react";
import noteAction from "@/lib/api/noteAction";

const Note = ({
  note,
  setAPIMessage,
}: {
  note: INote;
  setAPIMessage: (apiMessage: StoreContextType["apiMessage"] | null) => void;
}) => {
  const [hoverActive, setHoverActive] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleCardAction = (
    action: "ARCHIVE" | "UNARCHIVE" | "PIN" | "UNPIN" | "DELETE" | "UPDATE",
    data?: { [key: string]: string }
  ) => {
    noteAction({
      id: note._id,
      action,
      data,
      showToast: setAPIMessage,
    });
  };

  const PopoverButtonGroup = [
    {
      icon: Palette,
      title: "Background Color",
      action: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLDivElement;
        const role = target.role;
        if (role === "button") {
          const bgColor = target.dataset.bgColor;
          if (bgColor) handleCardAction(NOTE_ACTIONS[1], { bgColor });
        }
      },
      child: () => (
        <div className="flex gap-4">
          {PALETTE_OPTIONS.map((color) => (
            <div
              key={color}
              role="button"
              data-bg-color={color}
              aria-label={color}
              className={`w-4 h-4 rounded-full cursor-pointer border`}
              style={{ backgroundColor: `var(--color-${color})` }}
            ></div>
          ))}
        </div>
      ),
    },
    {
      icon: Tags,
      title: "Labels",
      action: () => handleCardAction(NOTE_ACTIONS[1], {}),
      child: () => <div></div>,
    },
  ];

  const HeaderOptions = (
    <Popover>
      <PopoverTrigger
        className="absolute top-4 right-4 rounded-full w-7 h-7 cursor-pointer"
        title="Pin"
        onClick={(e) => {
          e.stopPropagation();
          handleCardAction(NOTE_ACTIONS[note.isPinned ? 6 : 5]);
        }}
      >
        {note.isPinned ? <PinOff /> : <Pin />}
      </PopoverTrigger>
    </Popover>
  );

  const FooterOptions = (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
        {PopoverButtonGroup.map((button, idx) => {
          const ButtonIcon = button.icon;
          const Child = button.child();
          return (
            <Popover key={idx}>
              <PopoverTrigger
                title={button.title}
                className="rounded-full w-7 h-7 cursor-pointer "
              >
                <ButtonIcon />
              </PopoverTrigger>
              <PopoverContent
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation();
                  button.action(e);
                }}
              >
                {Child}
              </PopoverContent>
            </Popover>
          );
        })}

        <Popover>
          <PopoverTrigger
            title={note.isArchived ? "Unarchive" : "Archive"}
            className="rounded-full w-7 h-7 cursor-pointer "
            onClick={(e) => {
              e.stopPropagation();
              handleCardAction(NOTE_ACTIONS[note.isArchived ? 4 : 3]);
            }}
          >
            {note.isArchived ? <ArchiveRestore /> : <Archive />}
          </PopoverTrigger>
        </Popover>
      </div>

      <Popover>
        <PopoverTrigger
          title="Menu"
          onClick={(e) => e.stopPropagation()}
          className="rounded-full w-7 h-7 cursor-pointer"
        >
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="w-fit" onClick={(e) => e.stopPropagation()}>
          <DeleteNote
            note={note}
            deleteNote={() => handleCardAction(NOTE_ACTIONS[2])}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <Dialog
      key={note._id}
      open={editDialogOpen}
      onOpenChange={setEditDialogOpen}
    >
      <DialogTrigger asChild className="h-fit">
        <div>
          <NoteCard
            {...{
              note,
              HeaderOptions,
              FooterOptions,
              showOptions: hoverActive,
              cardEvents: {
                onMouseEnter: () => setHoverActive(true),
                onMouseLeave: () => setHoverActive(false),
                // onClick: () => setEditDialogOpen(true),
              },
            }}
          />
        </div>
      </DialogTrigger>

      <EditNote
        selectedNote={note}
        closeDialog={() => setEditDialogOpen(false)}
      />
    </Dialog>
  );
};

export default Note;
