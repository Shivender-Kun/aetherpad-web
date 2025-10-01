import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import FilterNote from "./FilterNote";
import SearchNote from "./SearchNote";

/** Props for the FilteredSearch component */
type Props = {
  /** Enable or disable filter functionality */
  enableFilter?: boolean;
  /** Enable or disable search functionality */
  enableSearch?: boolean;
  /** Optional class name for custom styling */
  className?: string;
  /** Dispatch selected values  */
  onChange: Dispatch<
    SetStateAction<{
      search: string;
      labels: string;
    }>
  >;
};

const FilteredSearch = ({
  enableFilter = false,
  enableSearch = true,
  className,
  onChange,
}: Props) => {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {enableSearch && (
        <SearchNote
          onChange={(search) => onChange((prev) => ({ ...prev, search }))}
        />
      )}
      {enableFilter && (
        <FilterNote
          onChange={(val) =>
            onChange((prev) => ({ ...prev, labels: val.join(",") }))
          }
        />
      )}
    </div>
  );
};

export default React.memo(FilteredSearch);
