import { Avatar, AvatarProps } from '@/components/avatar';
import { getUserInfo } from '@/services/profile';
import { useRequest } from 'ahooks';

export default function useUserInfo() {
    const { data, refresh } = useRequest(getUserInfo, {
        cacheKey: 'user',
        refreshOnWindowFocus: true,
    });

    function UserAvatar(props: Partial<AvatarProps>) {
        return <Avatar {...props} name={data?.data?.phone ?? ''} />;
    }

    return { user: data?.data, refresh, UserAvatar };
}
