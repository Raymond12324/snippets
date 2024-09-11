"use server";

import { db } from "@/db";
import { Snippet } from "@prisma/client";

export async function editSnippet(id: number, code: string) {
  const snippet = await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  return snippet;
}
