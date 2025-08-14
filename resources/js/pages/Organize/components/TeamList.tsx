import { Tree } from '@/components/xudev/BigTree';
import Permit from '@/components/xudev/Permit';
import { stopPropagation } from '@/lib/utils';
import { listTeams } from '@/services/organize';
import { Team } from '@/types';
import { EllipsisOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Dropdown, MenuProps } from 'antd';
import TeamCreate from './TeamCreate';
import TeamDestroy from './TeamDestroy';
import TeamUpdate from './TeamUpdate';

type TeamListProps = {
    teamId?: Team['id'];
    setTeamId?: (id: Team['id']) => void;
};

export default function TeamList({ teamId, setTeamId }: TeamListProps) {
    const { data, refresh } = useRequest(listTeams);

    function TeamAction({ entity }: { entity: Team }) {
        const ActionMenuItems: MenuProps['items'] = [
            {
                key: '1',
                label: (
                    <Permit check={`team:${entity.id}:write`}>
                        <TeamUpdate team={entity} refresh={refresh} />
                    </Permit>
                ),
            },
            {
                key: '2',
                label: (
                    <Permit check={`team:${entity.id}:delete`}>
                        <TeamDestroy team={entity} refresh={refresh} />
                    </Permit>
                ),
            },
        ];
        return (
            <Permit check={`team:${entity.id}:write`}>
                <div className="my-auto ml-auto mr-2" onClick={stopPropagation}>
                    <Dropdown trigger={['click']} menu={{ items: ActionMenuItems }}>
                        <EllipsisOutlined />
                    </Dropdown>
                </div>
            </Permit>
        );
    }

    return (
        <Permit check={`team:*:read`}>
            <ProCard
                title={
                    <div className="mr-2 flex flex-col whitespace-nowrap">
                        <span>组织架构</span>
                        <span className="font-mono text-xs text-gray-500">{teamId}</span>
                    </div>
                }
                className="flex-1/4"
                loading={!data?.data}
                extra={
                    <Permit check={`team:*:write`}>
                        <TeamCreate refresh={refresh} />
                    </Permit>
                }
            >
                <Tree<Team>
                    action={TeamAction}
                    treeData={data?.data ?? []}
                    fieldNames={{ title: 'name', key: 'id' }}
                    defaultExpandedKeys={data?.data?.map((t) => t.id)}
                    selectedKeys={[teamId ?? '']}
                    onSelect={(v) => setTeamId?.(v?.[0] as Team['id'])}
                />
            </ProCard>
        </Permit>
    );
}
