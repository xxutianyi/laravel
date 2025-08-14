import { deleteUser } from '@/services/organize';
import { User } from '@/types';
import { Popconfirm } from 'antd';

export default function UserDestroy({ refresh, user }: { refresh: () => void; user: User }) {
    return (
        <Popconfirm
            title="确认删除？"
            okText="删除"
            cancelText="保留"
            onConfirm={() => {
                deleteUser(user.id).then(() => {
                    refresh();
                });
            }}
        >
            <a className="danger">删除</a>
        </Popconfirm>
    );
}
