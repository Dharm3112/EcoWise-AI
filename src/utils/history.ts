export type WasteHistoryOutput = {
    wasteCategory: string;
    disposalCategory: string;
    confidence: number;
    recyclingRecommendation: string;
    disposalMethod: string;
    transparency: string;
};

export type WasteHistoryItem = {
    id: string;
    createdAt: string;
    input: {
        itemName: string;
        hasImage: boolean;
    };
    output: WasteHistoryOutput;
};

const KEY = 'ecowise_history_v1';

export function loadFromHistory(): WasteHistoryItem[] {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed as WasteHistoryItem[];
    } catch {
        return [];
    }
}

export function saveToHistory(item: WasteHistoryItem) {
    const prev = loadFromHistory();
    const next = [...prev, item];
    // keep it small
    const sliced = next.slice(-40);
    localStorage.setItem(KEY, JSON.stringify(sliced));
}

export function clearHistory() {
    localStorage.removeItem(KEY);
}

