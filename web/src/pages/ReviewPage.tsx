import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getResponse, type ReviewPayload } from "../api";

export function ReviewPage(){
    const { id } = useParams<{id: string}>();
    const [data, setData] = useState<ReviewPayload | null>(null);

    useEffect(() => {
        if(!id) return;
        const numericId = parseInt(id, 10);
        getResponse(numericId)
            .then(setData)
            .catch(console.error);

    }, [id]);

    if(!data) return <div className="p-4" >Loading...</div>
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-2xl font-bold">Your Responses</h2>
            <ul className="space-y-3">
                {data.items.map(item => (
                    <li key = {`${data.id}-${item.questionId}`} className="">
                        <div className="font-semibold">{item.title}</div>
                        <div>{item.value}</div>
                    </li>
                ))}
            </ul>
            <Link to="/" className="text-blue-600 underline">Start new Survey</Link>
        </div>
    )
}