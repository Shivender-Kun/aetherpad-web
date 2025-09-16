import { RotateCcw } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Note restore button component */
const RestoreButton = ({ onClick }: Props) => {
  return <ActionButton onClick={onClick} icon={RotateCcw} title={"Restore"} />;
};

export default RestoreButton;
