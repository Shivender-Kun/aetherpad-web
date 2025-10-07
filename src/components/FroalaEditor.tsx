"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";

// Import Froala CSS files
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";

// Import only the required plugins
import { MAX_PICTURE_SIZE } from "@/constants/dataLimits";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/lists.min.js";

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

  const toolbarButtons = [
    "bold",
    "italic",
    "underline",
    "strikeThrough",
    "|",
    "formatOL",
    "formatUL",
    "|",
    "insertLink",
    // "insertImage",
    "|",
    "undo",
    "redo",
    "clearFormatting",
  ];

  const pluginsEnabled = ["lists", "link", "image"]; // Explicitly enable only needed plugins

  const defaultConfig = {
    placeholderText: "Start typing...",
    charCounterCount: false,
    quickInsertEnabled: false,
    linkAlwaysBlank: true, // Open links in new tab
    linkInsertButtons: ["linkBack"],
    // Image configuration (adjust as needed)
    imageUploadURL: "/api/upload-image",
    imageMaxSize: MAX_PICTURE_SIZE,
    imageAllowedTypes: ["jpeg", "jpg", "png", "gif"],
    pluginsEnabled,
    toolbarButtons,
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

// "|",
// "fontFamily",
// "fontSize",
// "color",
// "paragraphFormat",
// "align",
// "insertVideo",
