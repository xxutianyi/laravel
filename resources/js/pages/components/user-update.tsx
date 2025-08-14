import { phoneRegex } from '@/lib/rule';
import { listTeams, updateUser } from '@/services/organize';
import { User } from '@/types';
import { ModalForm, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';

export default function UserUpdate({ refresh, user }: { refresh: () => void; user: User }) {
    async function onFinish(data: Partial<User>) {
        await updateUser({ id: user.id, ...data });
        refresh();
        return true;
    }

    return (
        <ModalForm<Partial<User>>
            width={400}
            onFinish={onFinish}
            initialValues={{
                ...user,
                team_ids: user.teams?.map((t) => t.id),
            }}
            trigger={<a>编辑</a>}
            modalProps={{ destroyOnHidden: true }}
        >
            <ProFormTreeSelect
                request={async (params) => {
                    return (await listTeams(params)).data;
                }}
                fieldProps={{
                    multiple: true,
                    fieldNames: { value: 'id', label: 'name' },
                }}
                rules={[{ required: true, message: '部门是必填项' }]}
                name="team_ids"
                label="所在部门"
            />
            <ProFormText
                name="name"
                label="姓名"
                rules={[{ required: true, message: '姓名是必填项' }]}
            />
            <ProFormText
                name="phone"
                label="手机号"
                rules={[
                    { required: true, message: '请输入手机号' },
                    { pattern: phoneRegex, message: '手机号格式不正确' },
                ]}
            />
            <ProFormText
                name="email"
                label="邮箱"
                rules={[{ type: 'email', message: '邮箱格式不正确' }]}
            />
        </ModalForm>
    );
}
