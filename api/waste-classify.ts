import { classifyWasteByRules } from "./wasteRules";

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

        const formData = await request.formData();
        const itemName = formData.get("itemName")?.toString() ?? "";

        if (!itemName) {
            return new Response(JSON.stringify({ error: "Missing itemName" }), {
                status: 400,
                headers: { "content-type": "application/json" },
            });
        }

        const result = classifyWasteByRules(itemName);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e?.message ?? "Classify failed" }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
};
