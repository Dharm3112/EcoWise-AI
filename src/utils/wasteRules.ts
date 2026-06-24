export type WasteCategory =
    | 'Recyclable'
    | 'Organic'
    | 'Electronic/Hazardous'
    | 'Hazardous'
    | 'General Waste';

export type DisposalCategory =
    | 'Recyclable'
    | 'Compost/Organic'
    | 'E-waste / Hazardous'
    | 'Landfill'
    | 'Unknown';

export type WasteClassificationResult = {
    wasteCategory: WasteCategory;
    disposalCategory: DisposalCategory;
    confidence: number; // 0..1
    recyclingRecommendation: string;
    disposalMethod: string;
    transparency: string;
};

function normalize(s: string) {
    return s.trim().toLowerCase();
}

function includesAny(text: string, terms: string[]) {
    return terms.some((t) => text.includes(t));
}

export function classifyWasteByRules(itemNameOrLabel: string): WasteClassificationResult {
    const s = normalize(itemNameOrLabel);

    // Electronic / hazardous
    if (
        includesAny(s, [
            'battery',
            'cell',
            'alkaline',
            'lithium',
            'power bank',
            'charger',
            'e-waste',
            'electronics',
            'wire',
            'bulb',
            'thermometer',
            'thermostat',
        ])
    ) {
        return {
            wasteCategory: 'Electronic/Hazardous',
            disposalCategory: 'E-waste / Hazardous',
            confidence: 0.72,
            recyclingRecommendation: 'Take to an e-waste / hazardous collection point. Do not throw in regular bins.',
            disposalMethod:
                'Tape exposed terminals (if battery) and drop at the nearest battery/e-waste collection.',
            transparency: 'Detected keywords indicating electronics or batteries, which require special handling.',
        };
    }

    // Organic
    if (includesAny(s, ['food', 'organic', 'banana', 'apple core', 'vegetable', 'egg shell', 'leftover', 'tea bag'])) {
        return {
            wasteCategory: 'Organic',
            disposalCategory: 'Compost/Organic',
            confidence: 0.75,
            recyclingRecommendation: 'Use composting/organic waste bin where available to reduce landfill impact.',
            disposalMethod: 'Place in organic/compost bin; keep away from recyclables to prevent contamination.',
            transparency: 'Detected organic/food-related keywords.',
        };
    }

    // Glass
    if (includesAny(s, ['glass', 'jar', 'bottle'])) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Recyclable',
            confidence: 0.66,
            recyclingRecommendation: 'Rinse and recycle if your local program accepts glass bottles/jars.',
            disposalMethod: 'Clean, remove caps/lids if required, and place in glass recycling stream.',
            transparency: 'Detected glass keywords; glass is typically recyclable when clean.',
        };
    }

    // Paper/Cardboard
    if (includesAny(s, ['cardboard', 'paper', 'newspaper', 'box', 'carton', 'paperboard'])) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Recyclable',
            confidence: 0.7,
            recyclingRecommendation: 'Recycle clean cardboard/paper. Avoid food-soiled paper in recycling.',
            disposalMethod: 'Flatten cardboard; keep paper dry; dispose in paper/cardboard recycling.',
            transparency: 'Detected paper/cardboard-related keywords.',
        };
    }

    // Plastics
    if (includesAny(s, ['plastic', 'bottle', 'container', 'tub', 'lid', 'straw'])) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Recyclable',
            confidence: 0.6,
            recyclingRecommendation: 'Rinse and recycle plastics where accepted. Check local rules for exact types.',
            disposalMethod:
                'Empty the container, give it a quick rinse, and place in plastic recycling bin.',
            transparency: 'Detected plastic/bottle keywords.',
        };
    }

    // Default
    return {
        wasteCategory: 'General Waste',
        disposalCategory: 'Landfill',
        confidence: 0.35,
        recyclingRecommendation: 'If uncertain, check local municipal guidelines before discarding.',
        disposalMethod: 'Use general waste bin until you can confirm the correct category.',
        transparency: 'No strong keyword match; defaulted to general waste for safety.',
    };
}

export function inferWasteFromMessage(message: string): WasteClassificationResult {
    return classifyWasteByRules(message);
}

export function answerDisposalByRules(message: string): WasteClassificationResult & { answerText: string } {
    const c = inferWasteFromMessage(message);

    const answerText = [
        `Waste category: ${c.wasteCategory}`,
        `Disposal category: ${c.disposalCategory}`,
        '',
        `How to dispose: ${c.disposalMethod}`,
        `Recycling tip: ${c.recyclingRecommendation}`,
        '',
        `Why: ${c.transparency}`,
    ].join('\n');

    return { ...c, answerText };
}

