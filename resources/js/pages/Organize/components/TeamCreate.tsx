import { createTeam, listTeams } from '@/services/organize';
import { Team } from '@/types';
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { Button } from 'antd';

export default function TeamCreate({ refresh }: { refresh: () => void }) {
    async function onFinish(data: Partial<Team>) {
        await createTeam(data);
        refresh();
        return true;
    }

    return (
        <ModalForm<Partial<Team>>
            width={400}
            onFinish={onFinish}
            trigger={<Button type="primary">新建团队</Button>}
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
