import Test from '@/components/xudev/test';
import usePermissions from '@/hooks/usePermissions';
import { PropsWithChildren } from 'react';

export default function TestPermission({ children, check }: PropsWithChildren<{ check: string }>) {
    const checkPermission = usePermissions();

    return <Test tester={checkPermission(check)}>{children}</Test>;
}
