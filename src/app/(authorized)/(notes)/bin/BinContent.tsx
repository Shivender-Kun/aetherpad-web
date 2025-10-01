"use client";

import { PageHeader, PageWrapper } from "@/app/(authorized)/_components/page";
import { useState } from "react";
import FilteredSearch from "../_components/filter/FilteredSearch";
import useFetchNotes from "../_hooks/useFetchNotes";
import BinnedNotes from "./_components/BinnedNotes";

const BinContent = () => {
  const [filter, setFilter] = useState({ search: "", labels: "" });
  const { loadMore } = useFetchNotes({ filter, type: "binned" });

  return (
    <PageWrapper>
      <PageHeader title="Binned Notes">
        <FilteredSearch onChange={setFilter} enableFilter />
      </PageHeader>
      <p className="px-3 text-sm text-gray-500">
        Notes will be kept here for 7 days
      </p>
      <BinnedNotes loadMore={loadMore} />
    </PageWrapper>
  );
};

export default BinContent;
