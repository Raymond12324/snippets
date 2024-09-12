import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id} className="border p-2 m-2 rounded">
        <h3 className="font-bold">{snippet.title}</h3>
        <pre>{snippet.code}</pre>
        <Link href={`/snippets/${snippet.id}`}>Show</Link>
      </div>
    );
  });
  return (
    <div>
      <Link href={"/snippets/new"}>New</Link>
      {renderedSnippets}
    </div>
  );
}
