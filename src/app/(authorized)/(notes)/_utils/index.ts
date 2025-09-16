import { notesSchema, TUpdateNoteSchemaInput } from "@/lib/schemas";
import { INote } from "@/lib/types";

/** Get input array for multi-select component  */
export function getMultiSelectOptions(item: { name: string; _id: string }[]) {
  const options = item.map((item) => ({ label: item.name, value: item._id }));
  return options;
}

/** Compare the previous and next note versions to check if update is required */
export const compareNoteContentVersions = (
  /** Unedited state of the note */
  prev: INote,
  /** Updated state of the note */
  next: TUpdateNoteSchemaInput,
) => {
  const transformPrevlabels = prev.labels.map((label) => label._id);

  const parsedPrev = notesSchema.updateInput.parse({
    ...prev,
    labels: transformPrevlabels,
  });

  return JSON.stringify(parsedPrev) !== JSON.stringify(next);
};
