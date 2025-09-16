import ActionButton from "@/app/(authorized)/_components/template/ActionButton";
import { MAX_LABELS_PER_USER } from "@/constants/dataLimits";
import { useAppSelector } from "@/store/hooks";
import { Plus } from "lucide-react";

type Props = {
  /** Button click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Label add button component */
const AddLabelButton = ({ onClick }: Props) => {
  const { list } = useAppSelector((state) => state.labels.data);

  return (
    <ActionButton
      onClick={onClick}
      icon={Plus}
      title={"Add Label"}
      disabled={list.length === MAX_LABELS_PER_USER}
      disabledReason={`Limit reached`}
    />
  );
};

export default AddLabelButton;
