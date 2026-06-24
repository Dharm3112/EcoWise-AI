import React from 'react';
import styles from './AppShell.module.css';

type RouteKey = 'home' | 'classify' | 'chat' | 'tips' | 'history';

const nav = [
    { key: 'home' as const, label: 'Home', href: '/' },
    { key: 'classify' as const, label: 'Classify Waste', href: '/classify.html' },
    { key: 'chat' as const, label: 'Disposal Assistant', href: '/chat.html' },
    { key: 'tips' as const, label: 'Sustainability Tips', href: '/tips.html' },
    { key: 'history' as const, label: 'History', href: '/history.html' },
];

export function AppShell({
    active,
    children,
}: {
    active: RouteKey;
    children: React.ReactNode;
}) {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.brand}>
                    <div className={styles.logo} aria-hidden="true">♻️</div>
                    <div>
                        <div className={styles.title}>EcoWise AI</div>
                        <div className={styles.subtitle}>Smart Waste Segregation & Sustainability Assistant</div>
                    </div>
                </div>

                <nav className={styles.nav} aria-label="Primary navigation">
                    {nav.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            className={item.key === active ? styles.navLinkActive : styles.navLink}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </header>

            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
                Built for SDG 11 • SDG 12 • SDG 13
            </footer>
        </div>
    );
}

