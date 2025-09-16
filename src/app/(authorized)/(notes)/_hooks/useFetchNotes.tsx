import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchActive, fetchArchived, fetchDeleted } from "@/store/slices/notes";
import { useCallback, useEffect } from "react";
import useDebounce from "./useDebounce";

type Props = {
  filter: { search: string; labels: string };
  type: "unpinned" | "archived" | "deleted";
};

const useFetchNotes = ({ filter, type }: Props) => {
  const notes = useAppSelector((state) => state.notes);
  const dispatch = useAppDispatch();

  const fetch = (page = 1) => {
    const payload = { ...filter, page };

    if (type === "archived") return dispatch(fetchArchived(payload));
    else if (type === "deleted") return dispatch(fetchDeleted(payload));
    else return dispatch(fetchActive(payload));
  };

  const loadMore = useCallback(
    () => fetch(notes[type].data.page + 1),
    [dispatch, notes[type].data.page, filter],
  );

  const filterNotes = useDebounce(async () => fetch(), 1000);

  useEffect(() => {
    if (notes[type].initialized) filterNotes(filter);
  }, [filter]);

  return { loadMore, filterNotes };
};

export default useFetchNotes;
