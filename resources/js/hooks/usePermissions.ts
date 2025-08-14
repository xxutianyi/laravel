import useUserInfo from '@/hooks/useUserInfo';

export default function usePermissions() {
    const { user } = useUserInfo();
    const permissions = user?.permissions;

    function checkPermission(check: string) {
        let permit = false;

        permissions?.forEach((permission) => {
            if (permission === '*' || permission === check) {
                permit = true;
            }

            const pattern = permission.replaceAll('*', '(.*)');

            if (new RegExp(`^${pattern}$`).test(check)) {
                permit = true;
            }
        });

        return permit;
    }

    return checkPermission;
}
