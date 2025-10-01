import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.AllHTMLAttributes<HTMLButtonElement> & {
  icon: React.ComponentType<{ className?: string }>;
  disabledReason?: string;
  tooltipClassName?: string;
};

const ActionButton = ({
  style,
  title,
  className,
  onClick,
  icon,
  disabled,
  disabledReason,
  tooltipClassName = "bottom-11",
}: Props) => {
  const Icon = icon;

  return (
    <Button
      variant={disabled ? "destructive" : "secondary"}
      type="button"
      aria-label={title}
      style={style}
      className={cn(
        `tooltip-visible animate-in fade-in relative flex h-10 w-fit cursor-pointer items-center justify-center rounded-full duration-500`,
        className,
      )}
      onClick={(e) => {
        !disabled && onClick && onClick(e);
      }}
    >
      <Icon />

      <span
        className={cn(
          "tooltip bg-secondary text-primary pointer-events-none absolute z-20 rounded-lg border px-2 py-1 text-[10px] opacity-0 duration-500 ease-in-out",
          tooltipClassName,
        )}
      >
        {disabled ? disabledReason : title}
      </span>
    </Button>
  );
};

export default ActionButton;
