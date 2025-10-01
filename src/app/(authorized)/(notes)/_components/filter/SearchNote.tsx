"use client";

import { Input } from "@/components/ui/input";

/** Props for the SearchNote component */
type Props = {
  /** Callback function to handle search input changes */
  onChange: (query: string) => void;
};

const SearchNote = ({ onChange }: Props) => {
  return (
    <div className="bg-card h-9 max-w-md">
      <Input
        type="text"
        name="search"
        placeholder="Search note..."
        onChange={(e) => onChange(e.target.value)}
        className="border-0 text-sm placeholder:text-gray-400"
        autoComplete="off"
      />
    </div>
  );
};

export default SearchNote;
