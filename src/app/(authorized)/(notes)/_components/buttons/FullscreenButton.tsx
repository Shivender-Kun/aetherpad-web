import { Maximize, Minimize } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Fullscreen status */
  isFullScreen: boolean;
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Note fullscreen button component */
const FullscreenButton = ({ isFullScreen, onClick }: Props) => {
  return (
    <ActionButton
      onClick={onClick}
      title={isFullScreen ? "Minimize" : "Maximize"}
      icon={isFullScreen ? Minimize : Maximize}
    />
  );
};

export default FullscreenButton;
