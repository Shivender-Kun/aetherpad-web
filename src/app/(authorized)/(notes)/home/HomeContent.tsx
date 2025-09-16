"use client";

import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import { useState } from "react";
import FilteredSearch from "../_components/FilteredSearch";
import useFetchNotes from "../_hooks/useFetchNotes";
import AddNote from "./_components/AddNoteDialog";
import HomeNotes from "./_components/HomeNotes";

const HomeContent = () => {
  const [filter, setFilter] = useState({ search: "", labels: "" });
  const { loadMore } = useFetchNotes({ filter, type: "unpinned" });

  return (
    <PageWrapper>
      <PageHeader title="Notes">
        <div className="flex gap-2">
          <FilteredSearch onChange={setFilter} enableFilter />
          <AddNote />
        </div>
      </PageHeader>
      <HomeNotes loadMore={loadMore} />
    </PageWrapper>
  );
};

export default HomeContent;
