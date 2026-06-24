import styles from './TipsPage.module.css';

const tips = [
    {
        title: 'Recycle correctly (SDG 12)',
        body: 'Check local rules. Keep recyclables clean and dry. Avoid mixing food waste with recyclables.',
    },
    {
        title: 'Handle batteries safely (Safety first)',
        body: 'Tape battery terminals and dispose at e-waste / hazardous collection points.',
    },
    {
        title: 'Compost organic waste',
        body: 'Food and other biodegradable waste belongs in composting/organic bins—reduces methane from landfills.',
    },
    {
        title: 'Reduce & reuse before recycle',
        body: 'Refill bottles, repair items, and choose durable products to cut overall waste generation.',
    },
    {
        title: 'Educate and spread habits',
        body: 'Small daily actions from households and schools improve city-level waste management (SDG 11).',
    },
];

export function TipsPage() {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>Sustainability Tips</h1>
            <p className={styles.p}>
                EcoWise helps you segregate waste better. These tips focus on SDG 11 and SDG 12.
            </p>

            <div className={styles.grid}>
                {tips.map((t) => (
                    <div key={t.title} className={styles.card}>
                        <div className={styles.cardTitle}>{t.title}</div>
                        <div className={styles.cardBody}>{t.body}</div>
                    </div>
                ))}
            </div>

            <div className={styles.note}>
                Prototype note: If you deploy with LLM later, you can use RAG to fetch your city’s official
                disposal guidelines before answering.
            </div>
        </div>
    );
}

