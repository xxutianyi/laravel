import background from '@/images/decoration/background.png';
import logo from '@/images/icon.png';
import RootLayout from '@/layouts/RootLayout';
import styles from '@/styles/layout.auth.module.css';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    const APP_NAME = import.meta.env.VITE_APP_NAME;

    return (
        <RootLayout>
            <div className={styles.page} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <img src={logo} className={styles.logo} alt="logo" />
                        <h1 className={styles.title}>{APP_NAME}</h1>
                    </header>
                    {children}
                </div>
            </div>
        </RootLayout>
    );
}
