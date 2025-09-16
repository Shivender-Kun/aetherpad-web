import { MAX_PINNED_NOTES } from "@/constants/dataLimits";
import { useAppSelector } from "@/store/hooks";
import { Pin, PinOff } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Pin status */
  isPinned: boolean;
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /** Button disabled status */
  disabled?: boolean;
  /** Reason to disable button; shown in the tooltip */
  disabledReason?: string;
};

/** Note pin/unpin button component */
const PinUnpinButton = ({ isPinned, onClick, ...props }: Props) => {
  const { list: pinnedList } = useAppSelector(
    (state) => state.notes.pinned.data,
  );

  return (
    <ActionButton
      onClick={onClick}
      icon={isPinned ? PinOff : Pin}
      className={`absolute top-4 right-4`}
      title={isPinned ? "Unpin" : "Pin"}
      disabled={!isPinned && pinnedList.length === MAX_PINNED_NOTES}
      disabledReason={`Limit reached`}
    />
  );
};

export default PinUnpinButton;
