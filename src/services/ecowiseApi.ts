
const API_BASE = (import.meta as any).env?.VITE_API_BASE ?? '/api';

export async function submitClassifyRequest(args: { file: File | null; itemName: string }) {
    // Edge function expects multipart/form-data.
    const form = new FormData();
    if (args.file) form.append('file', args.file);
    form.append('itemName', args.itemName);

    const res = await fetch(`${API_BASE}/waste-classify`, {
        method: 'POST',
        body: form,
    });

    if (!res.ok) throw new Error('waste-classify failed');
    return (await res.json()) as {
        wasteCategory: string;
        disposalCategory: string;
        confidence: number;
        recyclingRecommendation: string;
        disposalMethod: string;
        transparency: string;
    } & { [k: string]: any };
}

export async function submitDisposalChatRequest(args: { message: string }) {
    const res = await fetch(`${API_BASE}/disposal-chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(args),
    });

    if (!res.ok) throw new Error('disposal-chat failed');

    return (await res.json()) as {
        answerText: string;
        wasteCategory: string;
        disposalCategory: string;
        confidence: number;
        recyclingRecommendation: string;
        disposalMethod: string;
        transparency: string;
    };
}

