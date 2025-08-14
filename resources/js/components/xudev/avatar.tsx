import clsx from 'clsx';

export function Avatar({ src, className }: { src?: string; className?: string }) {
    if (src) {
        return (
            <img
                alt="avatar"
                src={src}
                className={clsx('size-6 rounded-full bg-gray-200', className)}
            />
        );
    }

    return <div className={clsx('size-6 rounded-full bg-gray-200', className)} />;
}
