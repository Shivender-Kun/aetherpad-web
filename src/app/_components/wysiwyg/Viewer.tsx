"use client";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";

type Props = {
  initialContent: string;
};

const extensions = [TextStyleKit, StarterKit];

const WysiwygViewer = ({ initialContent }: Props) => {
  const editor = useEditor({
    editable: false,
    content: initialContent,
    extensions,
    immediatelyRender: false,
  });

  useEffect(() => {
    editor?.commands.setContent(initialContent);
  }, [initialContent]);

  return (
    <div className="wysiwyg-viewer flex flex-col gap-2">
      <EditorContent editor={editor} />
    </div>
  );
};

export default React.memo(WysiwygViewer);
