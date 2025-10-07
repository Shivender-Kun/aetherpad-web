import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const PALETTE_OPTIONS = [
  "coral",
  "peach",
  "sand",
  "mint",
  "sage",
  "fog",
  "storm",
  "dusk",
  "blossom",
  "clay",
  "chalk",
] as const;

type Props = {
  /** Button click handler */
  onClick: (value: string) => void;
  /** Button classNames for styling */
  className?: string;
  /** Default selected color */
  defaultVal?: string;
};

/** Note color palette options component */
const PaletteOptions = ({
  onClick,
  className,
  defaultVal = "default",
}: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget;
    e.stopPropagation();
    const target = e.target as HTMLDivElement;
    const role = target.role;
    const selectedBgColor = target.dataset.bgColor;
    if (role === "button" && selectedBgColor) {
      onClick(selectedBgColor);
      parent.style.backgroundColor = `var(--color-${selectedBgColor})`;
    }
  };

  return (
    <div
      className={cn(
        `border-input animate-in fade-in absolute -top-14 flex w-full max-w-screen min-w-76 flex-wrap justify-between rounded-lg border p-4 shadow-xl duration-300 max-sm:-left-4`,
        className,
      )}
      onClick={handleClick}
      style={{ backgroundColor: `var(--color-${defaultVal}` }}
      onKeyDown={(e) => e.preventDefault()}
      tabIndex={5}
    >
      {PALETTE_OPTIONS.map((color) => (
        <Tooltip key={color}>
          <TooltipTrigger asChild>
            <div
              aria-label={color}
              role="button"
              data-bg-color={color}
              className="border-primary h-4 w-4 cursor-pointer rounded-full border"
              style={{ backgroundColor: `var(--color-${color})` }}
            ></div>
          </TooltipTrigger>
          <TooltipContent>{color}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default PaletteOptions;
