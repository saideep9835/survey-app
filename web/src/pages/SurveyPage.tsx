import { useState, useEffect } from "react";
import { getQuestions, postResponses } from "../api";
import { useNavigate } from "react-router-dom";

export interface Question {
    id: number;
    title: string;
    description: string;
    type: string;
}

export interface SubmitPayload {
    responses: Record<string, string>;
}

export function SurveyPage(){
    const [questions, setQuestions] = useState<Question[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [responses, setResponses] = useState<Record<string,string>>({});
    const navigate = useNavigate();

    useEffect(() =>{
        getQuestions()
            .then(setQuestions)
            .catch((e) => setError(String(e)));
    }, []);

    const handleChange = (id: number, value: string) => {
        setResponses(prev => ({...prev, [id]: value}));
    };

    const handleSubmit = async () => {
        const result = await postResponses({ responses} as SubmitPayload);
        console.log('submit click', { responses });
        navigate(`/review/${result.id}`);
    };
    return (
         <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Survey</h1>
            {error && (
                <div className=" mb-4 text-red-600">
                    Failed to load questions: {error}
                </div> 
            )}

            {questions.map(q => (
                <div key={q.id} className = "mb-4">
                    <label className="block font-semibold">{q.title}</label>
                    <p className="text-gray-600">{q.description}</p>

                    {q.type === 'textarea' ? (
                        <textarea
                           className="border p-2 w-full rounded mt-2"
                           rows={4}
                           value = {responses[q.id] ?? ''}
                           onChange = {(e) => handleChange(q.id,e.target.value)}
                           placeholder="Write your description here"
                        />
                    ):(
                        <input
                           className= "border p-2 w-full rounded mt-2"
                           type = {
                            q.type === 'number' || q.type ==='email' || q.type === 'tel' || q.type === 'date'
                             ? q.type: 'text'
                           
                           }
                           inputMode={
                            q.type === 'number' ? 'numeric' : q.type === 'tel' ? 'tel': q.type ==='email' ? 'email' : undefined
                           }
                           value = {responses[q.id] ?? ''}
                           onChange={(e) => handleChange(q.id, e.target.value)}
                           />
                           
                    
                    )}
                    </div>
            ))}
            <button className="bg-blue-500 text-white px-4 py-2 rounded diabled:opacity-50" onClick={handleSubmit}>Submit</button>
         </div>
    );

}