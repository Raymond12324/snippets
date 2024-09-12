import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {


    async function createSnippet(formData: FormData) {
        'use server';

        const title = formData.get('title') as string
        const code = formData.get('code') as string

        const snippet = await db.snippet.create({
            data: {
                title,
                code,
            }
        });
        redirect('/')
    }

    return (
        <div className="mt-12 bg-[hsl(var(--background))] flex items-center justify-center p-8">
            <div className="w-full max-w-md bg-[hsl(var(--card))] border rounded-lg p-8">
                <h1 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-6">Create snippet</h1>
               

                <form action={createSnippet} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="field1" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                            Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="w-full px-3 py-2 border border-[hsl(var(--input))] rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                            placeholder="Enter field 1"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="field2" className="block text-sm font-medium text-[hsl(var(--foreground))]">
                            Code
                        </label>
                        <Textarea
                            id="code"
                            name="code"
                            className="w-full px-3 py-2 bg-gray-300 border border-[hsl(var(--input))] rounded-md focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                            placeholder="Enter field 2"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] py-2 px-4 rounded-md hover:bg-[hsl(var(--primary)/.9)] transition duration-200"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}