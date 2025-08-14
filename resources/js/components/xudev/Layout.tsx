import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export function SpaceY({ children, className }: PropsWithChildren<{ className?: string }>) {
    return <div className={clsx(className, 'flex w-full flex-col gap-y-4')}>{children}</div>;
}

export function SpaceX({ children, className }: PropsWithChildren<{ className?: string }>) {
    return <div className={clsx(className, 'flex gap-x-4')}>{children}</div>;
}
