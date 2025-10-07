"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

// Import Froala CSS files
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// Import all Froala plugins
import "froala-editor/js/plugins.pkgd.min.js";

// Dynamically import Froala to avoid SSR issues
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

interface FroalaEditorProps {
  model?: string;
  onModelChange?: (model: string) => void;
  config?: any;
}

const FroalaEditor: React.FC<FroalaEditorProps> = ({
  model = "",
  onModelChange,
  config = {},
}) => {
  const [content, setContent] = useState(model);

  const handleModelChange = (newModel: string) => {
    setContent(newModel);
    if (onModelChange) onModelChange(newModel);
  };

  const defaultConfig = {
    placeholderText: "Start typing...",
    charCounterCount: false,
    quickInsertEnabled: false,
    toolbarButtons: [
      "bold",
      "italic",
      "underline",
      "strikeThrough",
      "|",
      "fontFamily",
      "fontSize",
      "color",
      "|",
      "paragraphFormat",
      "align",
      "formatOL",
      "formatUL",
      "|",
      "insertLink",
      "insertImage",
      // "insertVideo",
      "|",
      "undo",
      "redo",
      "clearFormatting",
    ],
    ...config,
  };

  return (
    <FroalaEditorComponent
      tag="textarea"
      model={content}
      onModelChange={handleModelChange}
      config={defaultConfig}
    />
  );
};

export default FroalaEditor;
