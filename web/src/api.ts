export type QuestionType = 'text' | 'number' | 'email' | 'textarea';

export interface Question {
    id: number;
    title: string;
    description: string;
    type: QuestionType | string;
}

export interface ReviewItem {
    questionId: number;
    title: string;
    value: string;
}

export interface ReviewPayload {
    id: number;
    createdAt: string;
    items: ReviewItem[];
}

const BASE = 'http://localhost:5050/api';

export async function getQuestions(): Promise<Question[]> {
    const r = await fetch(`${BASE}/questions`);
    if (!r.ok) throw new Error(`Failed to fetch questions ${r.status}`);
    return r.json();
}

export async function postResponses(payload: {responses: Record<string, string>}): Promise<{id: number}> {
    const r = await fetch(`${BASE}/responses`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
    });
    if (!r.ok) throw new Error(`submit failed: ${r.status}`);
    return r.json();
}

export async function getResponse(id: number): Promise<ReviewPayload>{
    const r = await fetch(`${BASE}/responses/${id}`);
    if (!r.ok) throw new Error(`submit failed: ${r.status}`);
    return r.json();

}