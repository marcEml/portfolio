"use client";

import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => onChange(currentEditor.getHTML()),
  });

  return (
    <div className="overflow-hidden rounded-[2px] border border-app-border bg-white">
      <div className="flex flex-wrap gap-2 border-b border-app-border bg-app-bg p-2">
        <Button
          type="button"
          variant="ghost"
          className="px-3"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          icon={<Bold size={16} />}
          aria-label="Gras"
        />
        <Button
          type="button"
          variant="ghost"
          className="px-3"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          icon={<Italic size={16} />}
          aria-label="Italique"
        />
        <Button
          type="button"
          variant="ghost"
          className="px-3"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          icon={<List size={16} />}
          aria-label="Liste"
        />
        <Button
          type="button"
          variant="ghost"
          className="px-3"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          icon={<ListOrdered size={16} />}
          aria-label="Liste numérotée"
        />
      </div>
      <EditorContent
        editor={editor}
        className="min-h-64 px-4 py-3 text-sm leading-7 [&_.ProseMirror]:outline-none [&_.ProseMirror]:border-none"
      />
    </div>
  );
}
