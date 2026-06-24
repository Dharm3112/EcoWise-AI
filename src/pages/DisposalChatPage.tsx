import React, { useEffect, useMemo, useState } from 'react';
import styles from './DisposalChatPage.module.css';
import { submitDisposalChatRequest } from '../services/ecowiseApi';
import { saveToHistory, type WasteHistoryItem } from '../utils/history';
import { answerDisposalByRules } from '../utils/wasteRules';

export function DisposalChatPage() {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
    const [error, setError] = useState<string | null>(null);

    const quickQuestions = useMemo(
        () => [
            'How should I dispose of a used battery?',
            'Where do I throw plastic bottles?',
            'Is cardboard recyclable?',
            'What to do with glass bottles?',
            'How to dispose of food waste?',
        ],
        []
    );

    useEffect(() => {
        setMessages([
            {
                role: 'assistant',
                text: "Hi! Ask me about how to dispose common items—I'll suggest the right waste category and safe disposal method.",
            },
        ]);
    }, []);

    async function onSend(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        const question = input.trim();
        if (!question) return;

        setInput('');
        const userMsg = { role: 'user' as const, text: question };
        setMessages((m) => [...m, userMsg]);

        setLoading(true);
        try {
            const res = await submitDisposalChatRequest({ message: question });

            const assistantText = res.answerText;
            const assistantMsg = { role: 'assistant' as const, text: assistantText };
            setMessages((m) => [...m, assistantMsg]);

            const historyItem: WasteHistoryItem = {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                input: { itemName: question, hasImage: false },
                output: {
                    wasteCategory: res.wasteCategory,
                    disposalCategory: res.disposalCategory,
                    confidence: res.confidence,
                    recyclingRecommendation: res.recyclingRecommendation,
                    disposalMethod: res.disposalMethod,
                    transparency: res.transparency,
                },
            };
            saveToHistory(historyItem);
        } catch {
            const fallback = answerDisposalByRules(question);
            const assistantMsg = { role: 'assistant' as const, text: fallback.answerText };
            setMessages((m) => [...m, assistantMsg]);
            const historyItem: WasteHistoryItem = {
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                input: { itemName: question, hasImage: false },
                output: {
                    wasteCategory: fallback.wasteCategory,
                    disposalCategory: fallback.disposalCategory,
                    confidence: 0.35,
                    recyclingRecommendation: fallback.recyclingRecommendation,
                    disposalMethod: fallback.disposalMethod,
                    transparency: fallback.transparency,
                },
            };
            saveToHistory(historyItem);
            setError('Edge function unavailable; using offline rule-based answers.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>Disposal Assistant</h1>
            <p className={styles.p}>
                Ask about how to dispose of everyday items. Prototype responses are rule-based for quick deployment.
            </p>

            <div className={styles.quickGrid}>
                {quickQuestions.map((q) => (
                    <button
                        key={q}
                        type="button"
                        className={styles.quickBtn}
                        onClick={() => {
                            setInput(q);
                        }}
                    >
                        {q}
                    </button>
                ))}
            </div>

            <div className={styles.chatBox}>
                <div className={styles.messages}>
                    {messages.map((m, idx) => (
                        <div
                            key={idx}
                            className={m.role === 'user' ? styles.msgUser : styles.msgAssistant}
                        >
                            {m.text}
                        </div>
                    ))}
                    {loading ? <div className={styles.typing}>EcoWise is thinking…</div> : null}
                </div>

                <form className={styles.composer} onSubmit={onSend}>
                    <input
                        className={styles.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g., Can I recycle a plastic bottle?"
                        disabled={loading}
                    />
                    <button className={styles.sendBtn} type="submit" disabled={loading}>
                        {loading ? 'Sending…' : 'Send'}
                    </button>
                </form>
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}
        </div>
    );
}

