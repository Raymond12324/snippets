"use server";

import { db } from "@/db";
import { Snippet } from "@prisma/client";
import { redirect } from "next/navigation";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;
  if (typeof title !== "string" || title.length < 3) {
    return { message: "title must be longer" };
  }
  if (typeof code !== "string" || code.length < 10) {
    return { message: "code must be longer" };
  }
  const newSnippet = db.snippet.create({
    data: {
      title,
      code,
    },
  });
  redirect(`/`);
}

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
