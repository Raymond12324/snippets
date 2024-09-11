import {db} from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id} className="border p-2 m-2 rounded">
        <h3 className="font-bold">{snippet.title}</h3>
        <pre>{snippet.code}</pre>
      </div>
    );
  });
  return (
   <div>
    {renderedSnippets}
   </div>
  );
}
