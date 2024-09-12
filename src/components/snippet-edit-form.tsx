"use client";

import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { startTransition, useState } from "react";
import { editSnippet } from "@/actions";
import { Button } from "./ui/button";
import { ArrowBigLeft, Play } from "lucide-react";
import Link from "next/link";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const [output, setOutput] = useState<string>("");

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };


  const runCode = () => {
    const logs: string[] = [];
    const originalConsoleLog = console.log;

    console.log = (...args: string[]) => {
      logs.push(args.join(" "));
      originalConsoleLog(...args);
    };

    try {
      eval(code);
      setOutput(logs.join("\n"));
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  const editSnippetAction = () => {
    startTransition(async () => {
      await editSnippet(snippet.id, code);
    });
  };

  return (
    <>
    <Button>
    <Link href={'/'}><ArrowBigLeft /></Link>
  </Button>
      <h1 className="text-2xl font-bold mb-2 mt-5">
      {snippet.title}
        </h1>
      <div className="flex gap-5">
    
      <div className="flex-1">
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
      <div className="flex-1 bg-gray-100 p-4 h-[80vh] overflow-y-auto rounded">
        <h2 className="font-semibold mb-2">Consola de Salida</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
        
      </div>
      <div>
        <Button className="bg-green-700" onClick={runCode}  size={"sm"}>
          <Play size={24} />
        </Button>
        </div>
    </div>
    </>
 
  );
}
