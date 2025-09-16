import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { truncateString } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticNoteUpdate, updateNote } from "@/store/slices/notes";
import { v4 as uuidv4 } from "uuid";
import ActionDialog from "../../../_components/template/ActionDialog";

/** ArchiveNoteDialog Props */
type Props = {
  /** Note title */
  note: INote;
  /** Archive note dialog visibility status */
  open: boolean;
  /** Archive note dialog visibility status changer */
  onOpenChange: (open: boolean) => void;
};

const ArchiveNoteDialog = ({ note, ...props }: Props) => {
  const actionStatus = useAppSelector(
    (state) => state.notes.actionStatus.update,
  );
  const dispatch = useAppDispatch();
  const { _id: id, title } = note;

  const actionHandler = () => {
    const actionId = uuidv4();
    const action = NOTE_ACTION.ARCHIVE;
    dispatch(optimisticNoteUpdate({ actionId, noteAction: action, note }));
    dispatch(updateNote({ actionId, action, id }));
  };

  return (
    <ActionDialog
      title="Archive Note"
      description={
        <>
          <u>Note: {truncateString(title, 30)}</u>
          <br />
          Are you sure you want to archive this note?
        </>
      }
      actionName="Archive"
      actionHandler={actionHandler}
      actionInProgress={actionStatus === "loading"}
      {...props}
    />
  );
};

export default ArchiveNoteDialog;
