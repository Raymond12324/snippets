import * as actions from "@/actions";
import SnippetFragment from "@/components/snippetFragment";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: Props) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippet = actions.deleteSnippet.bind(null, snippet.id);

  return (<>
  <Button>
    <Link href={'/'}><ArrowBigLeft /></Link>
  </Button>
    <div className="h-100 flex items-center mt-16">
      <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 rounded-lg shadow-lg w-6/12 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* <ion-icon name="logo-javascript" class="text-[hsl(var(--primary))] text-2xl mr-2"></ion-icon> */}
            <span className="text-sm font-medium">JavaScript</span>
          </div>
          <h2 className="text-lg font-bold">{snippet.title}</h2>

        </div>

        <div className="rounded-md mb-4 overflow-x-auto shadow">
          <SnippetFragment
            id={snippet.id}
            title={snippet.title}
            code={snippet.code}
          />
        </div>

        <div className="flex justify-between space-bweent mt-4 text-right text-sm text-[hsl(var(--muted-foreground))]">
          <div className="flex">
            <Link className="mr-2" href={`/snippets/${snippet.id}/edit`}>
              <Button variant="outline" size="sm">
                Editar
              </Button>
            </Link>
            <form action={deleteSnippet}>
              <Button className="bg-red-300" size="sm" type="submit">
                Eliminar
              </Button>
            </form>
          </div>

          <div>Added: 2 days ago • Views: 128</div>
        </div>
      </div>
    </div>
  </>

  );
}
