import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {


async function createSnippet( formData : FormData ) {
    'use server';

    const title = formData.get('title') as string
    const code = formData.get('code') as string

   const snippet = await db.snippet.create({
        data: {
            title,
            code,
        }
    });
    console.log(snippet)
    redirect('/')
}

    return (
        <form action={createSnippet}>
            <h3 className="font-bold m-3">Create a Snippet</h3>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="border w-full p-2 rounded"
                        id="title"
                        name="title"
                        type="text"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="font-semibold" htmlFor="code">
                        Code
                    </label>
                    <textarea
                        className="border w-full p-2 rounded h-32"
                        id="code"
                        name="code"
                    />
                </div>

                <button type="submit" className="rounded p-2 bg-blue-200 hover:bg-blue-300">
                    Create
                </button>
            </div>
        </form>
    )
}