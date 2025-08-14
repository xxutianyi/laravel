import { Avatar } from '@/components/xudev/Avatar';
import { SpaceX } from '@/components/xudev/Layout';
import Permit from '@/components/xudev/Permit';
import AppLayout from '@/layouts/AppLayout';
import { indexUsers } from '@/services/organize';
import { Team, User } from '@/types';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { useRef, useState } from 'react';
import TeamList from './components/TeamList';
import UserCreate from './components/UserCreate';
import UserDestroy from './components/UserDestroy';
import UserPermissions from './components/UserPermissions';
import UserUpdate from './components/UserUpdate';

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
                    <Permit check={`user:${entity.id}:write:permission`}>
                        <UserPermissions user={entity} />
                    </Permit>
                    <Permit check={`user:${entity.id}:write`}>
                        <UserUpdate refresh={refresh} user={entity} />
                    </Permit>
                    <Permit check={`user:${entity.id}:delete`}>
                        <UserDestroy refresh={refresh} user={entity} />
                    </Permit>
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
