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
import { NOTE_ACTIONS, PALETTE_OPTIONS } from "@/constants";
import DeleteNote from "@/app/(authorized)/home/_delete";
import EditNote from "@/app/(authorized)/home/_edit";
import noteAction from "@/lib/api/noteAction";
import NoteCard from "@/components/card/note";
import { useStore } from "@/store";
import { useState } from "react";
import { INote } from "@/types";

const Note = ({ note }: { note: INote }) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hoverActive, setHoverActive] = useState(false);

  const { setAPIMessage, isLoading, setIsLoading } = useStore();

  const handleCardAction = async (
    action: "ARCHIVE" | "UNARCHIVE" | "PIN" | "UNPIN" | "DELETE" | "UPDATE",
    data?: { [key: string]: string }
  ) => {
    await noteAction({
      data,
      action,
      id: note._id,
      setIsLoading,
      setAPIMessage,
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
        title="Pin"
        className="absolute top-4 right-4 rounded-full w-7 h-7 cursor-pointer flex items-center justify-center"
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
                className="rounded-full w-7 h-7 cursor-pointer flex items-center justify-center"
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
            className="rounded-full w-7 h-7 cursor-pointer flex items-center justify-center"
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
          className="rounded-full w-7 h-7 cursor-pointer flex items-center justify-center"
        >
          <EllipsisVertical />
        </PopoverTrigger>
        <PopoverContent className="w-fit" onClick={(e) => e.stopPropagation()}>
          <DeleteNote
            note={note}
            isLoading={isLoading}
            deleteNote={() => handleCardAction(NOTE_ACTIONS[2])}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </PopoverContent>
      </Popover>
    </div>
  );

  return (
    <>
      <NoteCard
        {...{
          note,
          HeaderOptions,
          FooterOptions,
          showOptions: hoverActive,
          cardEvents: {
            onMouseEnter: () => setHoverActive(true),
            onMouseLeave: () => setHoverActive(false),
            onClick: () => setEditDialogOpen(true),
          },
        }}
      />

      <EditNote
        selectedNote={note}
        closeDialog={() => setEditDialogOpen(false)}
        key={note._id}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
};

export default Note;
