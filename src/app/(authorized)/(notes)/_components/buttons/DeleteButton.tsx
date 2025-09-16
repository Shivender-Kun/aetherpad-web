import { BrushCleaning } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Note delete button component */
const DeleteButton = ({ onClick }: Props) => {
  return (
    <ActionButton
      onClick={onClick}
      icon={BrushCleaning}
      title={"Delete Forever"}
    />
  );
};

export default DeleteButton;
