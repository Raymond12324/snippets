import { db } from "@/db"
import { notFound } from "next/navigation"
interface Props {
    params:{
        id: string
    }
}

export default  async function SnippetShowPage(props : Props) {
    console.log(props)
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(props.params.id)
        }
    })

    if(!snippet){
        return notFound()
    }

    return (
        <div>
            <h3 className="font-bold m-3">{snippet?.title} </h3>
            <div className="border p-2 m-2 rounded">
               
                <pre>{snippet?.code}</pre>
            </div>
        </div>
    )
}