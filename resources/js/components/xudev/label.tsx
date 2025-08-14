import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface IconLabelProps {
    className?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    as?: React.FunctionComponent<PropsWithChildren<{ className?: string }>> | string;
}

export function IconLabel({ as, icon, className, children }: IconLabelProps) {
    const Component = as ?? 'span';

    return (
        <Component className={clsx('inline-flex items-center justify-center', className)}>
            <span className="mr-2">{icon}</span>
            <span>{children}</span>
        </Component>
    );
}
