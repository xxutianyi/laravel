import TestPermission from '@/components/test-permission';
import { Tree } from '@/components/xudev/tree';
import useTeams from '@/hooks/useTeams';
import { stopPropagation } from '@/lib/utils';
import TeamDestroy from '@/pages/components/team-destroy';
import { TeamUpdate } from '@/pages/components/team-update';
import { Team } from '@/types';
import { EllipsisOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Dropdown, MenuProps } from 'antd';
import { TeamCreate } from './team-create';

type TeamListProps = {
    teamId?: Team['id'];
    setTeamId?: (id: Team['id']) => void;
};

export function TeamList({ teamId, setTeamId }: TeamListProps) {
    const { teams, refresh } = useTeams();

    function TeamAction({ entity }: { entity: Team }) {
        const ActionMenuItems: MenuProps['items'] = [
            {
                key: '1',
                label: (
                    <TestPermission check={`team:${entity.id}:write`}>
                        <TeamUpdate team={entity} refresh={refresh} />
                    </TestPermission>
                ),
            },
            {
                key: '2',
                label: (
                    <TestPermission check={`team:${entity.id}:delete`}>
                        <TeamDestroy team={entity} refresh={refresh} />
                    </TestPermission>
                ),
            },
        ];
        return (
            <TestPermission check={`team:${entity.id}:write`}>
                <div className="my-auto ml-auto mr-2" onClick={stopPropagation}>
                    <Dropdown trigger={['click']} menu={{ items: ActionMenuItems }}>
                        <EllipsisOutlined />
                    </Dropdown>
                </div>
            </TestPermission>
        );
    }

    return (
        <TestPermission check={`team:*:read`}>
            <ProCard
                title={
                    <div className="mr-2 flex flex-col whitespace-nowrap">
                        <span>组织架构</span>
                        <span className="font-mono text-xs text-gray-500">{teamId}</span>
                    </div>
                }
                className="flex-1/4"
                loading={!teams}
                extra={
                    <TestPermission check={`team:*:write`}>
                        <TeamCreate refresh={refresh} />
                    </TestPermission>
                }
            >
                <Tree<Team>
                    action={TeamAction}
                    treeData={teams ?? []}
                    fieldNames={{ title: 'name', key: 'id' }}
                    defaultExpandedKeys={teams?.map((t) => t.id)}
                    selectedKeys={[teamId ?? '']}
                    onSelect={(v) => setTeamId?.(v?.[0] as Team['id'])}
                />
            </ProCard>
        </TestPermission>
    );
}
