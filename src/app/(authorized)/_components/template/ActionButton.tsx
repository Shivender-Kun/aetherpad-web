import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={disabled ? "destructive" : "default"}
          type="button"
          aria-label={title}
          style={style}
          className={cn(
            `flex h-10 w-fit cursor-pointer items-center justify-center rounded-full`,
            className,
          )}
          onClick={(e) => {
            !disabled && onClick && onClick(e);
          }}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{disabled ? disabledReason : title}</TooltipContent>
    </Tooltip>
  );
};

export default ActionButton;
