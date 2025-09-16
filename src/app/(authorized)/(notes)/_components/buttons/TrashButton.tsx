import { Trash2 } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Move note to trash button component */
const TrashButton = ({ onClick }: Props) => {
  return (
    <ActionButton onClick={onClick} icon={Trash2} title={"Move to trash"} />
  );
};

export default TrashButton;
