"use client";

import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import { useState } from "react";
import FilteredSearch from "../_components/FilteredSearch";
import useFetchNotes from "../_hooks/useFetchNotes";
import DeletedNotes from "./_components/DeletedNotes";

const TrashContent = () => {
  const [filter, setFilter] = useState({ search: "", labels: "" });
  const { loadMore } = useFetchNotes({ filter, type: "deleted" });

  return (
    <PageWrapper>
      <PageHeader title="Note Trash">
        <FilteredSearch onChange={setFilter} enableFilter />
      </PageHeader>
      <p className="px-3 text-sm text-gray-500">
        Notes will be kept here for 7 days
      </p>
      <DeletedNotes loadMore={loadMore} />
    </PageWrapper>
  );
};

export default TrashContent;
