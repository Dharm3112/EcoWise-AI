import { useMemo } from 'react';
import { AppShell } from './components/AppShell';
import { WasteClassifyPage } from './pages/WasteClassifyPage';
import { DisposalChatPage } from './pages/DisposalChatPage';
import { TipsPage } from './pages/TipsPage';
import { HistoryPage } from './pages/HistoryPage';

type RouteKey = 'home' | 'classify' | 'chat' | 'tips' | 'history';

function detectRoute(): RouteKey {
    const path = window.location.pathname;
    // With Netlify static hosting these HTML files are served directly.
    if (path.endsWith('/classify.html')) return 'classify';
    if (path.endsWith('/chat.html')) return 'chat';
    if (path.endsWith('/tips.html')) return 'tips';
    if (path.endsWith('/history.html')) return 'history';
    return 'home';
}

export default function App() {
    const route = useMemo(() => detectRoute(), []);

    return (
        <AppShell active={route}>
            {route === 'home' && <WasteClassifyPage />}
            {route === 'classify' && <WasteClassifyPage />}
            {route === 'chat' && <DisposalChatPage />}
            {route === 'tips' && <TipsPage />}
            {route === 'history' && <HistoryPage />}
        </AppShell>
    );
}

