import * as actions from "@/actions";
import { db } from "@/db";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: Props) {
  console.log(props);
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippet = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="h-screen flex items-center">
      <div className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] p-6 rounded-lg shadow-lg w-6/12 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* <ion-icon name="logo-javascript" class="text-[hsl(var(--primary))] text-2xl mr-2"></ion-icon> */}
            <span className="text-sm font-medium">JavaScript</span>
          </div>
          <h2 className="text-lg font-bold">{snippet.title}</h2>
          {/* <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <ion-icon name="ellipsis-horizontal" class="text-xl"></ion-icon>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
          <DropdownMenuItem>Export</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
        </div>

        <div className="bg-gray-200 rounded-md p-4 mb-4 overflow-x-auto">
          <pre className="text-sm font-mono">
            <code>{snippet.code}</code>
          </pre>
        </div>

        <div className="flex justify-between space-bweent mt-4 text-right text-sm text-[hsl(var(--muted-foreground))]">
          <div>
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="border pl-3 pr-3 mr-2"
            >
              Editar
            </Link>
            <form action={deleteSnippet}>
              <button className="border pl-3 pr-3" type="submit">
                Eliminar
              </button>
            </form>
          </div>

          <div>Added: 2 days ago • Views: 128</div>
        </div>
      </div>
    </div>
  );
}
