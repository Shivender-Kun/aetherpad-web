"use client";

import MultiSelectPopover from "@/components/ui/multi-select-popover";
import { useAppSelector } from "@/store/hooks";
import { Tags } from "lucide-react";
import { getMultiSelectOptions } from "../../_utils";

type Props = { onChange: (val: string[]) => void };

const FilterNote = ({ onChange }: Props) => {
  const labelsList = useAppSelector((state) => state.labels.data.list);
  const options = getMultiSelectOptions(labelsList);

  return (
    <MultiSelectPopover
      variant="secondary"
      title="Filter by labels"
      placeholder="Select labels"
      getCurrentSelectedValues={onChange}
      options={options}
      className="rounded-full"
      icon={Tags}
      tooltipClassName="top-11"
    />
  );
};

export default FilterNote;
