"use server";

import { db } from "@/db";
import { Snippet } from "@prisma/client";
import { redirect } from "next/navigation";

export async function editSnippet(id: number, code: string) {
  const snippet = await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  redirect(`/snippets/${snippet.id}`);
}

export async function deleteSnippet(id: number) {
  const snippet = await db.snippet.delete({
    where: {
      id,
    },
  });
  redirect("/");
}
