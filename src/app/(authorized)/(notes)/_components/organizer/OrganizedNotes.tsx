"use client";

import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { useMemo, useState } from "react";
import useOrganizeItems from "../../_hooks/useOrganizeItems";
import InteractiveNote from "../card/InteractiveNote";
import ArchiveNoteDialog from "../dialog/ArchiveNoteDialog";
import EditNote from "../dialog/EditNoteDialog";
import MoveNoteToTrash from "../dialog/MoveNoteToTrashDialog";
import UnarchiveNoteDialog from "../dialog/UnarchiveNoteDialog";

type Props = {
  notes: INote[];
  parentId: string;
};

const dialogsInitialState = {
  edit: false,
  trash: false,
  archive: false,
  unarchive: false,
};

const OrganizedNotes = ({ notes, parentId }: Props) => {
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
    if (type === NOTE_ACTION.UPDATE) {
      setDialogOpen({ ...dialogsInitialState, edit: true });
    } else if (type === NOTE_ACTION.TRASH) {
      setDialogOpen({ ...dialogsInitialState, trash: true });
    } else if (type === NOTE_ACTION.ARCHIVE) {
      setDialogOpen({ ...dialogsInitialState, archive: true });
    } else if (type === NOTE_ACTION.UNARCHIVE) {
      setDialogOpen({ ...dialogsInitialState, unarchive: true });
    }
  };

  const handleCloseDialog = (val?: boolean) => {
    if (!val) {
      setSelectedNote(null);
      setDialogOpen(dialogsInitialState);
    }
  };

  const renderNotes = useMemo(() => {
    const organizedItems = organizedList.map((list, idx) => (
      <div className="flex flex-1 flex-col gap-4" key={idx}>
        {list.map((note) => (
          <InteractiveNote
            key={note._id}
            note={note}
            availableItemWidth={availableItemWidth}
            handleNoteClick={(type: NOTE_ACTION) => handleNoteClick(note, type)}
          />
        ))}
      </div>
    ));

    return organizedItems;
  }, [organizedList]);

  return (
    <>
      {renderNotes}

      {selectedNote && dialogOpen.edit && (
        <EditNote
          selectedNote={selectedNote}
          closeDialog={handleCloseDialog}
          open={dialogOpen.edit}
          onOpenChange={handleCloseDialog}
        />
      )}

      {selectedNote && dialogOpen.trash && (
        <MoveNoteToTrash
          note={selectedNote}
          open={dialogOpen.trash}
          onOpenChange={handleCloseDialog}
        />
      )}

      {selectedNote && dialogOpen.archive && (
        <ArchiveNoteDialog
          note={selectedNote}
          open={dialogOpen.archive}
          onOpenChange={handleCloseDialog}
        />
      )}

      {selectedNote && dialogOpen.unarchive && (
        <UnarchiveNoteDialog
          note={selectedNote}
          open={dialogOpen.unarchive}
          onOpenChange={handleCloseDialog}
        />
      )}
    </>
  );
};

export default OrganizedNotes;
