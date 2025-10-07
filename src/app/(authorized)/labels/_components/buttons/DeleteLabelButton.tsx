import ActionButton from "@/app/(authorized)/_components/template/ActionButton";
import { Trash } from "lucide-react";

type Props = {
  /** Button click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Label delete button component */
const DeleteLabelButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick} icon={Trash} title={"Delete Label"} />;
};

export default DeleteLabelButton;
