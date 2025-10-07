import { Plus } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Button click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Note add button component */
const AddNoteButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick} icon={Plus} title={"Add note"} />;
};

export default AddNoteButton;
