"use client";

import { Editor } from "@monaco-editor/react";
import { Snippet } from "@prisma/client";
import { startTransition, useState } from "react";
import { editSnippet } from "@/actions";
import { Button } from "./ui/button";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const [output, setOutput] = useState<string>("");

  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  // Función para ejecutar el código ingresado y capturar la salida
  const runCode = () => {
    let logs: string[] = [];
    const originalConsoleLog = console.log;

    // Captura de la salida del console.log
    console.log = (...args: any[]) => {
      logs.push(args.join(" "));
      originalConsoleLog(...args);
    };

    try {
      eval(code); // Ejecuta el código
      setOutput(logs.join("\n")); // Muestra la salida capturada
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
    } finally {
      console.log = originalConsoleLog; // Restaura console.log
    }
  };

  const editSnippetAction = () => {
    startTransition(async () => {
      await editSnippet(snippet.id, code);
    });
  };

  return (
    <>
      <h1 className="text-3xl">
      {snippet.title}
        </h1>
      <div className="flex gap-5">
      {/* Contenedor del Editor */}
    
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
        <Button onClick={runCode} className="mt-2 w-full px-4" size={"sm"}>
          Ejecutar Código
        </Button>
      </div>

      {/* Contenedor de la Consola de Salida */}
      <div className="flex-1 bg-gray-100 p-4 h-[80vh] overflow-y-auto rounded">
        <h2 className="font-semibold mb-2">Consola de Salida</h2>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
    </>
 
  );
}
