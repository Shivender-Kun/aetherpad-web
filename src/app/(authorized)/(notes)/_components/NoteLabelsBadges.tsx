import { Badge } from "@/components/ui/badge";
import { SelectableOption } from "@/components/ui/multi-select-popover";

type Props = {
  /** Selected labels array */
  labels: SelectableOption[];
};

const NoteLabelsBadges = ({ labels }: Props) => {
  return (
    <div className="flex cursor-default flex-wrap gap-4 select-none">
      {labels.map((label) => {
        const { label: name, value } = label;
        return (
          <Badge variant="secondary" key={value}>
            {name}
          </Badge>
        );
      })}
    </div>
  );
};

export default NoteLabelsBadges;
