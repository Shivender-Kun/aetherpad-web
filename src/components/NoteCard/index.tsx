"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INote } from "@/types";

const NoteCard = ({
  note,
  showOptions,
  cardEvents,
  HeaderOptions,
  FooterOptions,
}: {
  note: INote;
  showOptions: boolean;
  HeaderOptions?: React.ReactNode;
  FooterOptions?: React.ReactNode;
  cardEvents: React.AllHTMLAttributes<HTMLDivElement>;
}) => {
  const labels = note.labels.length ? (
    <div className="flex flex-wrap gap-4">
      {note.labels.map((label) => (
        <Badge key={label}>{label}</Badge>
      ))}
    </div>
  ) : null;

  return (
    <Card
      {...cardEvents}
      className={`w-76 whitespace-break-spaces max-h-fit relative py-4`}
      style={{
        backgroundColor: `var(--${
          note.bgColor ? `color-${note.bgColor}` : "card"
        })`,
      }}
    >
      <CardHeader className="pt-4 px-4 pr-12">
        <CardTitle>{note.title}</CardTitle>
        {showOptions && HeaderOptions}
      </CardHeader>

      <CardContent className="flex flex-col gap-4 px-4 h-fit">
        <p className="max-h-84 overflow-hidden">{note.content}</p>
        {labels}
      </CardContent>

      <CardFooter className="flex flex-wrap gap-4 h-7 px-4">
        {showOptions && FooterOptions}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
