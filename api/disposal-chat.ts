import { answerDisposalByRules } from "./wasteRules";

export const config = {
    runtime: "edge",
};

export default async (request: Request) => {
    try {
        if (request.method !== "POST") {
            return new Response(JSON.stringify({ error: "Method not allowed" }), {
                status: 405,
                headers: { "content-type": "application/json" },
            });
        }

        const body = await request.json();
        const message = body?.message?.toString() ?? "";

        if (!message) {
            return new Response(JSON.stringify({ error: "Missing message" }), {
                status: 400,
                headers: { "content-type": "application/json" },
            });
        }

        const answer = answerDisposalByRules(message);

        return new Response(JSON.stringify({
            answerText: answer.answerText,
            wasteCategory: answer.wasteCategory,
            disposalCategory: answer.disposalCategory,
            confidence: 0.35,
            recyclingRecommendation: answer.recyclingRecommendation,
            disposalMethod: answer.disposalMethod,
            transparency: answer.transparency,
        }), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.message ?? "Chat failed" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
};
