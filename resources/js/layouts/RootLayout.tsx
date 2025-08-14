import icon from '@/images/icon.png';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <Head>
                <link rel="icon" type="image/png" href={icon} />
            </Head>
            {children}
        </>
    );
}
