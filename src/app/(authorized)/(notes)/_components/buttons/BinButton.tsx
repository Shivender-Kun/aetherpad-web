import { Trash2 } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Move note to bin button component */
const BinButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick} icon={Trash2} title={"Move to bin"} />;
};

export default BinButton;
