import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import React, { useMemo, useState } from "react";
import useOrganizeItems from "../../_hooks/useOrganizeItems";
import InteractiveBinnedNote from "../card/InteractiveBinnedNote";
import DeleteNoteDialog from "../dialog/DeleteNoteDialog";
import RestoreNoteDialog from "../dialog/RestoreNoteDialog";

/** Props for OrganizedBinnedNotes */
type Props = {
  /** Note data */
  notes: INote[];
  /** Unique id of the parent element */
  parentId: string;
};

const dialogsInitialState = {
  restore: false,
  delete: false,
};

const OrganizedBinnedNotes = ({ notes, parentId }: Props) => {
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);
  const [dialogOpen, setDialogOpen] = useState(dialogsInitialState);

  const [organizedList, availableItemWidth] = useOrganizeItems<INote>({
    gap: 16,
    items: notes,
    parentId,
    itemWidth: 320,
  });

  const handleNoteClick = (note: INote, type: NOTE_ACTION) => {
    setSelectedNote(note);
    if (type === NOTE_ACTION.RESTORE) {
      setDialogOpen({ ...dialogsInitialState, restore: true });
    } else if (type === NOTE_ACTION.DELETE) {
      setDialogOpen({ ...dialogsInitialState, delete: true });
    }
  };

  const handleCloseDialog = (val?: boolean) => {
    if (!val) {
      setSelectedNote(null);
      setDialogOpen(dialogsInitialState);
    }
  };

  const renderNotes = useMemo(() => {
    return organizedList.map((list, idx) => (
      <div className="flex flex-col gap-4" key={idx}>
        {list.map((note) => (
          <InteractiveBinnedNote
            key={note._id}
            note={note}
            availableItemWidth={availableItemWidth}
            handleNoteClick={(type: NOTE_ACTION) => handleNoteClick(note, type)}
          />
        ))}
      </div>
    ));
  }, [organizedList, availableItemWidth, handleNoteClick]);

  return (
    <>
      {renderNotes}

      {selectedNote && dialogOpen.restore && (
        <RestoreNoteDialog
          note={selectedNote}
          open={dialogOpen.restore}
          onOpenChange={handleCloseDialog}
        />
      )}

      {selectedNote && dialogOpen.delete && (
        <DeleteNoteDialog
          note={selectedNote}
          open={dialogOpen.delete}
          onOpenChange={handleCloseDialog}
        />
      )}
    </>
  );
};

export default React.memo(OrganizedBinnedNotes);
