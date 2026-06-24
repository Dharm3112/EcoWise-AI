import React, { useMemo, useState } from 'react';
import styles from './WasteClassifyPage.module.css';
import { classifyWasteByRules } from '../utils/wasteRules';
import { saveToHistory, type WasteHistoryItem } from '../utils/history';
import { submitClassifyRequest } from '../services/ecowiseApi';

export function WasteClassifyPage() {
    const [label, setLabel] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WasteHistoryItem | null>(null);
    const [error, setError] = useState<string | null>(null);

    const previewUrl = useMemo(() => {
        if (!file) return null;
        return URL.createObjectURL(file);
    }, [file]);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);

        const itemName = label.trim();

        if (!file && !itemName) {
            setError('Upload an image or enter a waste item name (e.g., battery, plastic bottle).');
            return;
        }

        setLoading(true);
        try {
            // Prototype approach:
            // - Send to Netlify edge function if available.
            // - If it fails, fall back to local rule-based classifier.
            const res = await submitClassifyRequest({ file, itemName });
            const historyItem: WasteHistoryItem = {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                input: {
                    itemName,
                    hasImage: !!file,
                },
                output: res,
            };
            setResult(historyItem);
            saveToHistory(historyItem);
        } catch (err: any) {
            const fallback = classifyWasteByRules(itemName || inferFromLabel(label));
            const historyItem: WasteHistoryItem = {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                input: { itemName: itemName || label, hasImage: !!file },
                output: {
                    wasteCategory: fallback.wasteCategory,
                    disposalCategory: fallback.disposalCategory,
                    confidence: 0.35,
                    recyclingRecommendation: fallback.recyclingRecommendation,
                    disposalMethod: fallback.disposalMethod,
                    transparency: fallback.transparency,
                },
                // If we ever want to store computed category from label
            };
            setResult(historyItem);
            saveToHistory(historyItem);
            setError('Edge function unavailable; showing offline rule-based result.');
        } finally {
            setLoading(false);
        }
    }

    function inferFromLabel(s: string) {
        return s;
    }

    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>Smart Waste Segregation</h1>
            <p className={styles.p}>
                Upload an image or type what the waste item is. EcoWise will classify it into a waste
                category and show disposal + recycling guidance.
            </p>

            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.grid}>
                    <div>
                        <label className={styles.label}>Waste item image (optional)</label>
                        <input
                            className={styles.input}
                            type="file"
                            accept="image/*"
                            onChange={(ev) => setFile(ev.target.files?.[0] ?? null)}
                        />
                        {previewUrl ? (
                            <img className={styles.preview} src={previewUrl} alt="Waste preview" />
                        ) : (
                            <div className={styles.previewPlaceholder}>No image selected</div>
                        )}
                    </div>

                    <div>
                        <label className={styles.label}>Or type the item name</label>
                        <input
                            className={styles.input}
                            value={label}
                            onChange={(ev) => setLabel(ev.target.value)}
                            placeholder="e.g., plastic bottle, glass jar, battery, cardboard"
                        />
                        <div className={styles.chips}>
                            {[
                                'Plastic bottle',
                                'Glass bottle',
                                'Cardboard',
                                'Food waste',
                                'Battery',
                            ].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className={styles.chip}
                                    onClick={() => setLabel(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Classifying…' : 'Classify Waste'}
                    </button>
                    <div className={styles.hint}>
                        Prototype uses <b>rule-based</b> classification for quick deployment.
                    </div>
                </div>
            </form>

            {error ? <div className={styles.error}>{error}</div> : null}

            {result ? (
                <section className={styles.card} aria-live="polite">
                    <h2 className={styles.cardTitle}>Result</h2>
                    <div className={styles.resultGrid}>
                        <div>
                            <div className={styles.kvLabel}>Waste Category</div>
                            <div className={styles.kvValue}>{result.output.wasteCategory}</div>
                        </div>
                        <div>
                            <div className={styles.kvLabel}>Disposal Category</div>
                            <div className={styles.kvValue}>{result.output.disposalCategory}</div>
                        </div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>Disposal method</div>
                        <div className={styles.blockBody}>{result.output.disposalMethod}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>Recycling recommendation</div>
                        <div className={styles.blockBody}>{result.output.recyclingRecommendation}</div>
                    </div>

                    <div className={styles.block}>
                        <div className={styles.blockTitle}>Why this classification?</div>
                        <div className={styles.blockBody}>{result.output.transparency}</div>
                    </div>

                    <div className={styles.smallRow}>
                        Confidence: {(result.output.confidence * 100).toFixed(0)}%
                    </div>
                </section>
            ) : null}
        </div>
    );
}

