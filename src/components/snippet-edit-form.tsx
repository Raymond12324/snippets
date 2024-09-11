"use client";

import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { startTransition, useState } from "react";
import { editSnippet } from "@/actions";
import { redirect } from "next/navigation";

interface SnippetEditFormProps {
  snippet: Snippet;
}
export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippetAction = () => {
    startTransition(async () => {
      await editSnippet(snippet.id, code);
    });
    redirect(`/snippets/${snippet.id}`);
  };

  const [code, setCode] = useState(snippet.code);

  return (
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button
          type="submit"
          className="rounded p-2 bg-blue-200 hover:bg-blue-300"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
