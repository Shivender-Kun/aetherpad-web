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
};

/** Note color palette options component */
const PaletteOptions = ({ onClick, className }: Props) => {
  return (
    <div
      role="button"
      className={cn(
        `bg-secondary/50 animate-in fade-in flex w-full flex-wrap justify-evenly rounded-lg py-2 duration-300`,
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        const target = e.target as HTMLDivElement;
        const role = target.role;
        const selectedBgColor = target.dataset.bgColor;
        if (role === "button" && selectedBgColor) {
          onClick(selectedBgColor);
        }
      }}
      onKeyDown={(e) => {
        e.preventDefault();
      }}
      tabIndex={5}
    >
      {PALETTE_OPTIONS.map((color) => (
        <div
          key={color}
          aria-label={color}
          role="button"
          data-bg-color={color}
          className={`tooltip-visible border-primary relative h-4 w-4 cursor-pointer rounded-full border`}
          style={{ backgroundColor: `var(--color-${color})` }}
        >
          <span className="tooltip bg-secondary text-primary animation-in pointer-events-none absolute top-5 -right-4 z-10 rounded-lg border px-2 py-1 text-[10px] opacity-0 duration-500 ease-in-out">
            {color}
          </span>
        </div>
      ))}
    </div>
  );
};

export default PaletteOptions;
