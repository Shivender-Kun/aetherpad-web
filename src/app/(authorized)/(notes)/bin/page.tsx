import { notesServerApi } from "@/lib/api";
import { INote, PaginatedData } from "@/lib/types";
import getRequestContext from "@/lib/utils/server/getRequestContext";
import { NotesHydrator } from "../_components/NotesHydrator";
import BinContent from "./BinContent";

const Bin = async () => {
  const binnedNotes = await notesServerApi.fetchInitalBinnedNotes(
    await getRequestContext(),
  );

  const binned: PaginatedData<INote> = binnedNotes || {
    list: [],
    page: 1,
    limit: 10,
    hasMore: false,
  };

  return (
    <>
      <NotesHydrator binned={binned} />
      <BinContent />
    </>
  );
};

export default Bin;
