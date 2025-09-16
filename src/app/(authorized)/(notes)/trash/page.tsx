import { notesServerApi } from "@/lib/api";
import { INote, PaginatedData } from "@/lib/types";
import getRequestContext from "@/lib/utils/server/getRequestContext";
import { NotesHydrator } from "../_components/NotesHydrator";
import TrashContent from "./TrashContent";

const Trash = async () => {
  const deletedNotes = await notesServerApi.fetchInitalDeletedNotes(
    await getRequestContext(),
  );

  const deleted: PaginatedData<INote> = deletedNotes || {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  };

  return (
    <>
      <NotesHydrator deleted={deleted} />
      <TrashContent />
    </>
  );
};

export default Trash;
