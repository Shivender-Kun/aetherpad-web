import { notesServerApi } from "@/lib/api";
import { INote, PaginatedData } from "@/lib/types";
import getRequestContext from "@/lib/utils/server/getRequestContext";
import NotesHydrator from "../_components/NotesHydrator";
import ArchivedContent from "./ArchivedContent";

export const dynamic = "force-dynamic";

const Archived = async () => {
  const archivedNotes = await notesServerApi.fetchInitalArchivedNotes(
    await getRequestContext(),
  );

  const archived: PaginatedData<INote> = archivedNotes || {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  };

  return (
    <>
      <NotesHydrator archived={archived} />
      <ArchivedContent />
    </>
  );
};

export default Archived;
