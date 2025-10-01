import { Palette } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Optional button click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Show/hide note color palette button component */
const PaletteButton = ({ onClick }: Props) => {
  return (
    <ActionButton
      onClick={(e) => onClick && onClick(e)}
      icon={Palette}
      title={"Note Color"}
    />
  );
};

export default PaletteButton;
