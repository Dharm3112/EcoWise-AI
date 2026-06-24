export interface RuleResult {
    wasteCategory: string;
    disposalCategory: string;
    recyclingRecommendation: string;
    disposalMethod: string;
    transparency: string;
}

export interface ChatRuleResult extends RuleResult {
    answerText: string;
}

export function classifyWasteByRules(itemName: string): RuleResult {
    const name = itemName.toLowerCase();

    if (name.includes('battery') || name.includes('batteries')) {
        return {
            wasteCategory: 'Electronic/Hazardous',
            disposalCategory: 'Hazardous Waste Collection',
            disposalMethod: 'Take to a local e-waste recycling center or hazardous waste collection point. Do not throw in general trash.',
            recyclingRecommendation: 'Battery components (lithium, lead, acid) can be highly toxic but recyclable in specialized plants.',
            transparency: 'Classified as Electronic/Hazardous waste because batteries contain toxic chemicals that pose environmental hazards if landfilled.'
        };
    }
    if (name.includes('plastic bottle') || name.includes('water bottle') || name.includes('plastic')) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Recycling Bin',
            disposalMethod: 'Rinse the bottle, crush to save space, and place it in your plastic recycling bin.',
            recyclingRecommendation: 'PET/HDPE plastic is highly recyclable and can be turned into new bottles or polyester fibers.',
            transparency: 'Classified as Recyclable because PET/HDPE bottles are widely accepted by municipal recycling programs.'
        };
    }
    if (name.includes('cardboard') || name.includes('paper') || name.includes('box')) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Paper/Cardboard Bin',
            disposalMethod: 'Flatten the cardboard box, keep it dry, and place it in the paper/cardboard recycling bin.',
            recyclingRecommendation: 'Paper fibers can be recycled up to 5-7 times into new packaging materials.',
            transparency: 'Classified as Recyclable because clean paper and cardboard are highly reusable and biodegradable under right conditions.'
        };
    }
    if (name.includes('glass bottle') || name.includes('glass jar') || name.includes('glass')) {
        return {
            wasteCategory: 'Recyclable',
            disposalCategory: 'Glass Recycling Bin',
            disposalMethod: 'Rinse the container, remove plastic/metal caps if required locally, and place in glass bin.',
            recyclingRecommendation: 'Glass is 100% recyclable and can be recycled endlessly without loss in quality or purity.',
            transparency: 'Classified as Recyclable because container glass is a highly recyclable material with active collection systems.'
        };
    }
    if (name.includes('food') || name.includes('organic') || name.includes('vegetable') || name.includes('fruit') || name.includes('banana') || name.includes('apple')) {
        return {
            wasteCategory: 'Organic',
            disposalCategory: 'Organic Waste/Compost Bin',
            disposalMethod: 'Dispose in the green compost bin, or use a home composting system.',
            recyclingRecommendation: 'Compost organic waste to create nutrient-rich soil helper, reducing landfill methane emissions.',
            transparency: 'Classified as Organic because it is biodegradable organic matter.'
        };
    }

    // Default fallback
    return {
        wasteCategory: 'Recyclable',
        disposalCategory: 'Recycling Bin',
        disposalMethod: 'Check locally if this item is recyclable. Rinse out any residue, keep dry, and sort appropriately.',
        recyclingRecommendation: 'General recommendation: Reduce and reuse first before sending items to the recycle bin.',
        transparency: 'Defaulted to Recyclable category. Please check with your local community recycling guidelines.'
    };
}

export function answerDisposalByRules(question: string): ChatRuleResult {
    const result = classifyWasteByRules(question);
    const answerText = `Based on my offline rules, this item is categorized as **${result.wasteCategory}**. 

* **Disposal category:** ${result.disposalCategory}
* **Disposal method:** ${result.disposalMethod}
* **Recycling recommendation:** ${result.recyclingRecommendation}

*(Using offline rules classification)*`;

    return {
        ...result,
        answerText
    };
}
