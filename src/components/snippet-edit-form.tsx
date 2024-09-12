"use client";

import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { startTransition, useState } from "react";
import { editSnippet } from "@/actions";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

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
  };

  const [code, setCode] = useState(snippet.code);

  return (
    <div>
      <Editor
        height="80vh"
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
        <Button className="mt-2 w-full px-4" size={"sm"} type="submit">
          Edit
        </Button>
      </form>
    </div>
  );
}
