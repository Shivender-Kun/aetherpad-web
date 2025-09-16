import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.AllHTMLAttributes<HTMLButtonElement> & {
  icon: React.ComponentType<{ className?: string }>;
  disabledReason?: string;
};

const ActionButton = ({
  style,
  title,
  className,
  onClick,
  icon,
  disabled,
  disabledReason,
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

      <span className="tooltip bg-secondary text-primary animate-in pointer-events-none absolute top-11 z-20 rounded-lg border px-2 py-1 text-[10px] opacity-0 duration-500 ease-in-out">
        {disabled ? disabledReason : title}
      </span>
    </Button>
  );
};

export default ActionButton;
