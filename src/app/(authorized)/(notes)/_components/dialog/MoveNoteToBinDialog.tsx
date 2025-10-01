import { INote } from "@/lib/types";
import { NOTE_ACTION } from "@/lib/types/enums";
import { truncateString } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { optimisticNoteUpdate, updateNote } from "@/store/slices/notes";
import { v4 as uuidv4 } from "uuid";
import ActionDialog from "../../../_components/template/ActionDialog";

/** MoveNoteToBinDialog Props */
type Props = {
  /** Note data */
  note: INote;
  /** MoveToBin note dialog visibility status */
  open: boolean;
  /** MoveToBin note dialog visibility status changer */
  onOpenChange: (open: boolean) => void;
};

const MoveNoteToBinDialog = ({ note, ...props }: Props) => {
  const actionStatus = useAppSelector(
    (state) => state.notes.actionStatus.update,
  );
  const dispatch = useAppDispatch();
  const { _id: id, title } = note;

  const actionHandler = () => {
    const actionId = uuidv4();
    const action = NOTE_ACTION.BIN;
    dispatch(optimisticNoteUpdate({ actionId, noteAction: action, note }));
    dispatch(updateNote({ actionId, action, id }));
  };

  return (
    <ActionDialog
      title="Move To Bin"
      description={
        <>
          <u>Note: {truncateString(title, 30)}</u>
          <br />
          Are you sure you want to move this note to bin?
        </>
      }
      actionName="Move"
      actionHandler={actionHandler}
      actionInProgress={actionStatus === "loading"}
      {...props}
    />
  );
};

export default MoveNoteToBinDialog;
