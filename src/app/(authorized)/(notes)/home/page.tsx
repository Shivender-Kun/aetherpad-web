import { notesServerApi } from "@/lib/api";
import { INote, PaginatedData } from "@/lib/types";
import getRequestContext from "@/lib/utils/server/getRequestContext";
import { NotesHydrator } from "../_components/NotesHydrator";
import HomeContent from "./HomeContent";

const Home = async () => {
  const notes = await notesServerApi.fetchInitalActiveNotes(
    await getRequestContext(),
  );

  const pinned: INote[] = notes?.pinned || [];
  const unpinned: PaginatedData<INote> = notes?.unpinned || {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  };

  return (
    <>
      <NotesHydrator pinned={pinned} unpinned={unpinned} />
      <HomeContent />
    </>
  );
};

export default Home;
