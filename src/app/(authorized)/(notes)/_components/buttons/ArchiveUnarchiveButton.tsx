import { Archive, ArchiveRestore } from "lucide-react";
import ActionButton from "../../../_components/template/ActionButton";

type Props = {
  /** Archive status */
  isArchived: boolean;
  /** Button click handler */
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

/** Note archive/unarchive button component */
const ArchiveUnarchiveButton = ({ isArchived, onClick }: Props) => {
  return (
    <ActionButton
      onClick={onClick}
      title={isArchived ? "Unarchive" : "Archive"}
      icon={isArchived ? ArchiveRestore : Archive}
    />
  );
};

export default ArchiveUnarchiveButton;
