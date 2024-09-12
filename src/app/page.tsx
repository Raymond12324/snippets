
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Navbar from "@/components/ui/navbar";
import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Card
        key={snippet.id}
        className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))]"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {snippet.title} {snippet.id}
            </h3>
            <Badge>JavaScript</Badge>
          </div>
        </CardHeader>
        <CardContent className="max-h-14">
          <p className="text-sm mb-4">{snippet.code.slice(0, 100)}...</p>
        </CardContent>
        <CardFooter>
          <Link href={`/snippets/${snippet.id}t`}>
            <Button variant="outline" size="sm">
              {/* <ion-icon name="copy-outline"></ion-icon> */}
              <span>View</span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  });
  return (

    <div>
      {/* <Link href={"/snippets/new"}>
        <Button variant="outline">New</Button>
      </Link> */}
      <Button className="my-5">
        <Link href="/snippets/new">New</Link>
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">

        {renderedSnippets}
      </div>
    </div>


  );
}
