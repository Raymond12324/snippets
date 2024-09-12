"use client";
import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";

export default function SnippetFragment(snippet: Snippet) {
  return (
    <Editor
      height="50vh"
      theme="vs-dark"
      language="javascript"
      defaultValue={snippet.code}
      options={{
        minimap: { enabled: true },
        fontSize: 12,
        readOnly: true,
        padding: { top: 10, bottom: 10 },
      }}
    />
  );
}
