import { useEffect, useState } from 'react';
import styles from './HistoryPage.module.css';
import { loadFromHistory, type WasteHistoryItem, clearHistory } from '../utils/history';

export function HistoryPage() {
    const [items, setItems] = useState<WasteHistoryItem[]>([]);

    useEffect(() => {
        setItems(loadFromHistory());
    }, []);

    return (
        <div className={styles.wrap}>
            <div className={styles.topRow}>
                <div>
                    <h1 className={styles.h1}>History</h1>
                    <p className={styles.p}>Your recent classifications and disposal answers are stored locally in this browser.</p>
                </div>

                <button
                    type="button"
                    className={styles.clearBtn}
                    onClick={() => {
                        clearHistory();
                        setItems([]);
                    }}
                    disabled={items.length === 0}
                >
                    Clear
                </button>
            </div>

            {items.length === 0 ? (
                <div className={styles.empty}>No history yet. Use Home/Classify or Chat first.</div>
            ) : (
                <div className={styles.list}>
                    {[...items].reverse().map((it) => (
                        <div key={it.id} className={styles.item}>
                            <div className={styles.meta}>
                                <div className={styles.when}>{new Date(it.createdAt).toLocaleString()}</div>
                            </div>
                            <div className={styles.input}>
                                <div className={styles.inputLabel}>Input</div>
                                <div className={styles.inputText}>{it.input.itemName}</div>
                            </div>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>Waste Category</div>
                                <div className={styles.outputValue}>{it.output.wasteCategory}</div>
                            </div>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>Disposal Method</div>
                                <div className={styles.outputBody}>{it.output.disposalMethod}</div>
                            </div>
                            <div className={styles.output}>
                                <div className={styles.outputLabel}>Why</div>
                                <div className={styles.outputBody}>{it.output.transparency}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

