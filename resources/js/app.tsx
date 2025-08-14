import './app.css';

import '@ant-design/v5-patch-for-react-19';
import { createInertiaApp } from '@inertiajs/react';
import { App as AppProvider } from 'antd';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            [`./pages/${name}.tsx`, `./pages/${name}/index.tsx`],
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <AppProvider>
                <App {...props} />
            </AppProvider>,
        );
    },
    progress: {
        color: '#1167e6',
    },
});
