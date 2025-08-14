import { default as BAvatar } from 'boring-avatars';
import { AvatarProps as BAvatarProps } from 'boring-avatars/dist/components/types';

export type AvatarProps = Omit<BAvatarProps, 'colors' | 'variant'>;

export function Avatar(props: AvatarProps) {
    return (
        <BAvatar
            {...props}
            variant="beam"
            colors={['#343635', '#d90057', '#e88700', '#77b8a6', '#ffe2ba']}
        />
    );
}
