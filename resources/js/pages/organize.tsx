import { Avatar } from '@/components/avatar';
import TestPermission from '@/components/test-permission';
import { SpaceX } from '@/components/xudev/layout';
import AppLayout from '@/layouts/app-layout';
import UserCreate from '@/pages/components/user-create';
import UserDestroy from '@/pages/components/user-destroy';
import UserPermissions from '@/pages/components/user-permissions';
import UserUpdate from '@/pages/components/user-update';
import { indexUsers } from '@/services/organize';
import { Team, User } from '@/types';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef, useState } from 'react';
import { TeamList } from './components/team-list';

export default function Organize() {
    const tableRef = useRef<ActionType>(null);
    const [teamId, setTeamId] = useState<Team['id']>();

    function refresh() {
        tableRef.current?.reload();
    }

    const userColumns: ProColumns<User>[] = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: '15%',
            render: (dom, entity) => (
                <span className="flex items-center gap-x-2">
                    <Avatar className="size-8" name={entity.phone ?? ''} />
                    <span>{dom}</span>
                </span>
            ),
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            width: '20%',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: '20%',
        },
        {
            title: '所在团队',
            dataIndex: 'teams',
            width: '30%',
            hideInSearch: true,
            render: (_, entity) =>
                entity.teams?.map((t) => (
                    <Tag key={t.id} color="geekblue">
                        {t.path}
                    </Tag>
                )),
        },
        {
            title: '操作',
            key: 'action',
            width: '15%',
            hideInSearch: true,
            render: (_, entity) => (
                <SpaceX>
                    <TestPermission check={`user:${entity.id}:write:permission`}>
                        <UserPermissions user={entity} />
                    </TestPermission>
                    <TestPermission check={`user:${entity.id}:write`}>
                        <UserUpdate refresh={refresh} user={entity} />
                    </TestPermission>
                    <TestPermission check={`user:${entity.id}:delete`}>
                        <UserDestroy refresh={refresh} user={entity} />
                    </TestPermission>
                </SpaceX>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="flex gap-x-4">
                <TeamList teamId={teamId} setTeamId={setTeamId} />
                <ProTable<User>
                    rowKey="id"
                    className="w-full"
                    toolBarRender={() => [<UserCreate key="create" refresh={refresh} />]}
                    actionRef={tableRef}
                    form={{ syncToUrl: true }}
                    columns={userColumns}
                    params={{ team_id: teamId }}
                    request={async (params) => {
                        const { data, code } = await indexUsers(params);
                        return {
                            data: data.data,
                            total: data.total,
                            success: code === 0,
                        };
                    }}
                />
            </div>
        </AppLayout>
    );
}
