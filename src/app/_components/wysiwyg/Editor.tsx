"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

type Props = {
  initialContent?: string;
  onChange: (content: string) => void;
  menuVisible?: boolean;
};

const extensions = [TextStyleKit, StarterKit];

const WysiwygEditor = ({
  onChange,
  initialContent = "",
  menuVisible = false,
}: Props) => {
  const editor = useEditor({
    editable: true,
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    extensions,
    immediatelyRender: false,
  });

  return (
    <div className="wysiwyg-editor flex flex-1 flex-col gap-2 overflow-auto">
      {editor && menuVisible && <MenuBar editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default WysiwygEditor;

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div
      className="editor-menu flex flex-wrap gap-2"
      onClick={(e) => e.preventDefault()}
    >
      <div className="bg-secondary/50 btn-group flex gap-2 rounded-lg p-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "btn-active" : ""}
        >
          <Bold />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "btn-active" : ""}
        >
          <Italic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          className={editorState.isUnderline ? "btn-active" : ""}
        >
          <Underline />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "btn-active" : ""}
        >
          <Strikethrough />
        </Button>
      </div>
      <div className="bg-secondary/50 btn-group flex gap-2 rounded-lg p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <Heading />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2">
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={editorState.isHeading1 ? "btn-active" : ""}
              >
                <Heading1 />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={editorState.isHeading2 ? "btn-active" : ""}
              >
                <Heading2 />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={editorState.isHeading3 ? "btn-active" : ""}
              >
                <Heading3 />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={editorState.isHeading4 ? "btn-active" : ""}
              >
                <Heading4 />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={editorState.isHeading5 ? "btn-active" : ""}
              >
                <Heading5 />
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={editorState.isHeading6 ? "btn-active" : ""}
              >
                <Heading6 />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <List />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col gap-2">
            <DropdownMenuItem asChild>
              <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editorState.isBulletList ? "btn-active" : ""}
              >
                Bullet
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editorState.isOrderedList ? "btn-active" : ""}
              >
                Ordered
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="bg-secondary/50 btn-group flex flex-wrap gap-2 rounded-lg p-2">
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "btn-active" : ""}
        >
          Code
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "btn-active" : ""}
        >
          Code block
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "btn-active" : ""}
        >
          Blockquote
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Hr
        </Button>
      </div>
      <div className="bg-secondary/50 btn-group flex flex-wrap gap-2 rounded-lg p-2">
        <Button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          title="Undo"
        >
          <Undo2 />
        </Button>
        <Button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          title="Redo"
        >
          <Redo2 />
        </Button>
      </div>
    </div>
  );
}
