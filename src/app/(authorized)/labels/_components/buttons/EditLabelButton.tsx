import ActionButton from "@/app/(authorized)/_components/template/ActionButton";
import { Edit3 } from "lucide-react";

type Props = {
  /** Button click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Label edit button component */
const EditLabelButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick} icon={Edit3} title={"Edit Label"} />;
};

export default EditLabelButton;
