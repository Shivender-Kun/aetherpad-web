"use client";

import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import { useState } from "react";
import FilteredSearch from "../_components/FilteredSearch";
import useFetchNotes from "../_hooks/useFetchNotes";
import ArchivedNotes from "./_components/ArchivedNotes";

const ArchivedContent = () => {
  const [filter, setFilter] = useState({ search: "", labels: "" });
  const { loadMore } = useFetchNotes({ filter, type: "archived" });

  return (
    <PageWrapper>
      <PageHeader title="Archived Notes">
        <FilteredSearch onChange={setFilter} enableFilter />
      </PageHeader>
      <ArchivedNotes loadMore={loadMore} />
    </PageWrapper>
  );
};

export default ArchivedContent;
