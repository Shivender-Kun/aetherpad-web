import { INote } from "@/lib/types";
import { truncateString } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteNote, optimisticNoteDelete } from "@/store/slices/notes";
import ActionDialog from "../../../_components/template/ActionDialog";

/** DeleteNoteDialog Props */
type Props = {
  /** Note title */
  note: INote;
  /** Delete note dialog visibility status */
  open: boolean;
  /** Delete note dialog visibility status changer */
  onOpenChange: (open: boolean) => void;
};

const DeleteNoteDialog = ({ note, ...props }: Props) => {
  const actionStatus = useAppSelector(
    (state) => state.notes.actionStatus.update,
  );
  const dispatch = useAppDispatch();
  const { _id: id, title } = note;

  const actionHandler = () => {
    dispatch(optimisticNoteDelete({ note }));
    dispatch(deleteNote(id));
  };

  return (
    <ActionDialog
      title="Delete Note Forever"
      description={
        <>
          <u>Note: {truncateString(title, 30)}</u>
          <br />
          Are you sure you want to delete this note permanently?
        </>
      }
      actionName="Delete"
      actionHandler={actionHandler}
      actionInProgress={actionStatus === "loading"}
      {...props}
    />
  );
};

export default DeleteNoteDialog;
