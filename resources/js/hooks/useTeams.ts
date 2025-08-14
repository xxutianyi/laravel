import { listTeams } from '@/services/organize';
import { useRequest } from 'ahooks';

export default function useTeams() {
    const { data, refresh } = useRequest(listTeams);

    return { teams: data?.data, refresh };
}
