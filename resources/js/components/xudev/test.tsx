import React, { PropsWithChildren } from 'react';

interface TestProps extends PropsWithChildren {
    tester?: boolean | (() => boolean);
    placeholder?: React.ReactNode;
}

export default function Test({ tester, placeholder, children }: TestProps) {
    if (tester && typeof tester !== 'function') {
        tester = () => tester as boolean;
    }

    if (tester && tester()) {
        return children;
    }

    return placeholder ?? undefined;
}
