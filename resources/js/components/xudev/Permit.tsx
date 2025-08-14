import usePermissions from '@/hooks/usePermissions';
import { PropsWithChildren } from 'react';

export default function Permit({ children, check }: PropsWithChildren<{ check: string }>) {
    const checkPermission = usePermissions();
    const permit = checkPermission(check);
    return permit ? children : undefined;
}
