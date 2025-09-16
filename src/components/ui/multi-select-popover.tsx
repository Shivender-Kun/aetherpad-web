// src/components/custom-multi-select.tsx

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

type Icon = React.ComponentType<{ className?: string }>;

type Option = {
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: string;
  /** Optional icon component to display alongside the option. */
  icon?: Icon;
};

export type SelectableOption = Option & { selected?: boolean };

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: Option[];

  /**
   * Callback function triggered when the selected options change.
   * Receives an array of the new selected options.
   */
  getCurrentSelectedOptions?: (option: SelectableOption[]) => void;

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  getCurrentSelectedValues?: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;
}

export const MultiSelectPopoverContent = ({
  title,
  options,
  getCurrentSelectedOptions,
  getCurrentSelectedValues,
  defaultValue = [],
  placeholder = "",
  maxCount,
}: MultiSelectProps) => {
  const [selectableValues, setSelectableOptions] =
    useState<SelectableOption[]>(options);

  useEffect(() => {
    const initialSelected = options.map((option) => ({
      ...option,
      selected: defaultValue.some((selected) => selected === option.value),
    }));
    setSelectableOptions(initialSelected);
  }, [options.length, defaultValue.length]);

  const toggleOption = (idx: number) => {
    const newSelectableValues = [...selectableValues];
    newSelectableValues[idx].selected = !newSelectableValues[idx].selected;
    setSelectableOptions(newSelectableValues);
    getCurrentSelectedOptions &&
      getCurrentSelectedOptions(
        newSelectableValues.filter((val) => val.selected),
      );
    getCurrentSelectedValues &&
      getCurrentSelectedValues(
        newSelectableValues
          .filter((val) => val.selected)
          .map((val) => val.value),
      );
  };

  const handleClear = () => {
    setSelectableOptions((pre) =>
      pre.map((option) => ({ ...option, selected: false })),
    );
    getCurrentSelectedOptions && getCurrentSelectedOptions([]);
    getCurrentSelectedValues && getCurrentSelectedValues([]);
  };

  return (
    <PopoverContent className="w-auto p-0" align="start">
      <Command>
        <CommandInput placeholder={placeholder || "Search..."} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup
            className="max-h-60 overflow-auto"
            heading={maxCount && `Select upto ${maxCount} ${title || "items"}`}
          >
            {selectableValues.map((option, idx) => {
              const isSelected = !!option.selected;
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(idx)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  {option.icon && (
                    <option.icon className="text-muted-foreground mr-2 h-4 w-4" />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
            <div className="flex items-center justify-between">
              {selectableValues.length > 0 && (
                <CommandItem
                  onSelect={handleClear}
                  className="flex-1 cursor-pointer justify-center"
                >
                  Clear
                </CommandItem>
              )}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  );
};

MultiSelectPopoverContent.displayName = "MultiSelectPopoverContent";

export const MultiSelectPopover = (
  props: MultiSelectProps & {
    icon: Icon;
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
    className?: string;
  },
) => {
  const { icon, className = "", variant = "default", title = "" } = props;
  const Icon = icon;

  return (
    <Popover>
      <PopoverTrigger className={className} asChild>
        <Button
          variant={variant}
          aria-label={title}
          className="tooltip-visible relative"
        >
          <Icon />

          {title && (
            <span className="tooltip bg-secondary text-primary animate-in pointer-events-none absolute top-11 z-20 rounded-lg border px-2 py-1 text-[10px] opacity-0 duration-500 ease-in-out">
              {title}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <MultiSelectPopoverContent {...props} />
    </Popover>
  );
};

MultiSelectPopover.displayName = "MultiSelectPopover";

export default MultiSelectPopover;
