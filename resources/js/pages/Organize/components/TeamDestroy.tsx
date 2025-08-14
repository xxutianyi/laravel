import { deleteTeam } from '@/services/organize';
import { Team } from '@/types';
import { Popconfirm } from 'antd';

export default function TeamDestroy({ refresh, team }: { refresh: () => void; team: Team }) {
    return (
        <Popconfirm
            title="确认删除？"
            okText="删除"
            cancelText="保留"
            onConfirm={() => {
                deleteTeam(team.id).then(() => {
                    refresh();
                });
            }}
        >
            <a className="danger">删除</a>
        </Popconfirm>
    );
}
