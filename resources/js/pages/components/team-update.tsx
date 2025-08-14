import { listTeams, updateTeam } from '@/services/organize';
import { Team } from '@/types';
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';

export function TeamUpdate({ refresh, team }: { refresh: () => void; team: Team }) {
    async function onFinish(data: Partial<Team>) {
        await updateTeam({ id: team.id, ...data });
        refresh();
        return true;
    }

    return (
        <ModalForm<Partial<Team>>
            width={400}
            onFinish={onFinish}
            initialValues={team}
            trigger={<a>修改</a>}
            modalProps={{ destroyOnHidden: true }}
        >
            <ProFormTreeSelect
                request={async (params) => {
                    return (await listTeams(params)).data;
                }}
                fieldProps={{ fieldNames: { value: 'id', label: 'name' } }}
                name="parent_id"
                label="上级部门"
            />
            <ProFormText
                name="name"
                label="名称"
                rules={[{ required: true, message: '名称是必填项' }]}
            />
        </ModalForm>
    );
}
