import { updateUser } from '@/services/organize';
import { getAllPermissions } from '@/services/permissions';
import { User } from '@/types';
import { App, Modal, Transfer, TransferProps } from 'antd';
import React, { useEffect, useState } from 'react';

export default function UserPermissions({ user }: { user: User }) {
    const { message } = App.useApp();

    const [modalVisible, setModalVisible] = useState(false);
    const [permissions, setPermissions] = useState<TransferProps['dataSource']>([]);

    const [targetKeys, setTargetKeys] = useState<string[]>(user.permissions ?? []);
    const [selectedKeys, setSelectedKeys] = useState<TransferProps['targetKeys']>([]);

    function onChange(nextTargetKeys: React.Key[]) {
        (nextTargetKeys as string[]).sort((a, b) => a.length - b.length);
        (nextTargetKeys as string[]).sort();
        setTargetKeys(nextTargetKeys as string[]);
    }

    function onSelectChange(sourceSelectedKeys: React.Key[], targetSelectedKeys: React.Key[]) {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }

    function onFinish() {
        const newUser = {
            ...user,
            permissions: targetKeys,
            team_ids: user.teams?.map((t) => t.id),
        };

        updateUser(newUser).then(() => {
            setModalVisible(false);
            return message.success('权限更新成功');
        });
    }

    function onCloseModal() {
        setTargetKeys(user.permissions ?? []);
        setModalVisible(false);
    }

    useEffect(() => {
        getAllPermissions().then((res) => {
            setPermissions(
                res.data.map((item: string) => {
                    return { key: item, title: item };
                }),
            );
        });
    }, []);

    return (
        <>
            <a onClick={() => setModalVisible(true)}>权限</a>
            <Modal
                title="查看/修改权限"
                width={1068}
                open={modalVisible}
                destroyOnHidden={true}
                onOk={onFinish}
                onCancel={onCloseModal}
            >
                <Transfer
                    className="my-6"
                    showSearch={true}
                    listStyle={{ width: 500, height: 560 }}
                    dataSource={permissions}
                    titles={['可选权限', '已授权限']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={onChange}
                    onSelectChange={onSelectChange}
                    render={(item) => <span className="font-mono">{item.title}</span>}
                    filterOption={(inputValue, item) => item.title?.includes(inputValue)}
                />
            </Modal>
        </>
    );
}
