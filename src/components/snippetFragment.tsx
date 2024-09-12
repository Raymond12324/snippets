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
        minimap: { enabled: false },
        fontSize: 8,
        readOnly: true,
      }}
    />
  );
}
