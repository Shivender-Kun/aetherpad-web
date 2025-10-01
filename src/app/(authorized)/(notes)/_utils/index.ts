import { noteSchema, TUpdateNoteSchema } from "@/lib/schemas";
import { INote } from "@/lib/types";

/** Get input array for multi-select component  */
export function getMultiSelectOptions(item: { name: string; _id: string }[]) {
  if (!item.length) return [];
  return item.map((item) => ({ label: item.name, value: item._id }));
}

/** Compare the previous and next note versions to check if update is required */
export const compareNoteContentVersions = (
  /** Unedited state of the note */
  prev: INote,
  /** Updated state of the note */
  next: TUpdateNoteSchema,
) => {
  const transformPrevlabels = prev.labels.map((label) => label._id);

  const parsedPrev = noteSchema.update.parse({
    ...prev,
    labels: transformPrevlabels,
  });

  return JSON.stringify(parsedPrev) !== JSON.stringify(next);
};
