import { useConfig } from '@/hooks/useConfig';
import background from '@/images/decoration/background.png';
import logo from '@/images/icon.png';
import Layout from '@/layouts/layout';
import styles from '@/styles/layout.auth.module.css';
import { PropsWithChildren } from 'react';

export default function AuthLayout({
    children,
    noHeader,
}: PropsWithChildren<{ noHeader?: boolean }>) {
    const { config } = useConfig();
    const APP_NAME = import.meta.env.VITE_APP_NAME;

    return (
        <Layout>
            <div className={styles.page} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.container}>
                    {!noHeader && (
                        <header className={styles.header}>
                            <img
                                src={config?.app_icon ?? logo}
                                className={styles.logo}
                                alt="logo"
                            />
                            <h1 className={styles.title}>{config?.app_name ?? APP_NAME}</h1>
                        </header>
                    )}
                    {children}
                </div>
            </div>
        </Layout>
    );
}
