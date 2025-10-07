"use client";

import FroalaEditor from "@/components/FroalaEditor";
import { useState } from "react";

type Props = {
  initialContent?: string;
  onChange: (content: string) => void;
};

export default function Editor({ initialContent = "", onChange }: Props) {
  const [content, setContent] = useState(initialContent);

  const handleModelChange = (model: string) => {
    setContent(model);
    onChange(model);
  };

  return <FroalaEditor model={content} onModelChange={handleModelChange} />;
}
