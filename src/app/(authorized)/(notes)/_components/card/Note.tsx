"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INote } from "@/lib/types";
import { truncateString } from "@/lib/utils";
import { getMultiSelectOptions } from "../../_utils";
import NoteLabelsBadges from "../NoteLabelsBadges";

/** Note card component props */
type Props = React.AllHTMLAttributes<HTMLDivElement> & {
  /** Note data */
  note: INote;
  /** Note floating header options component */
  HeaderOptions?: React.ReactNode | null;
  /** Note footer options component */
  FooterOptions?: React.ReactNode | null;
  /** Note card hover status */
  hoverActive: boolean;
  /** Available width per note
   * - Use `w-[${availableItemWidth || "320"}]` in tailwind css
   */
  availableItemWidth: number;
};

const NoteCard = ({
  note,
  hoverActive,
  HeaderOptions,
  FooterOptions,
  availableItemWidth,
  ...cardEvents
}: Props) => {
  const labels = note.labels.length ? (
    <NoteLabelsBadges labels={getMultiSelectOptions(note.labels)} />
  ) : null;

  return (
    <Card
      {...cardEvents}
      className={`relative h-fit min-w-80 w-[${availableItemWidth || "320"}] gap-4 py-4 whitespace-break-spaces duration-500`}
      style={{
        backgroundColor: `var(--${
          note.bgColor && note.bgColor !== "default"
            ? `color-${note.bgColor}`
            : "card"
        })`,
      }}
    >
      <CardHeader className="px-4 pt-4 pr-12">
        <CardTitle className="overflow-hidden">
          {truncateString(note.title, 28)}
        </CardTitle>
        {hoverActive && HeaderOptions}
      </CardHeader>

      <CardContent className="flex h-fit flex-col gap-4 px-4">
        <p className="max-h-84 overflow-hidden">{note.content}</p>
        {labels}
      </CardContent>

      <CardFooter className="flex min-h-10 flex-wrap gap-4 px-4">
        {hoverActive && FooterOptions}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
