import { Base64ImageUploader } from '@/components/xudev/inputs';
import { createClient, deleteClient, updateClient } from '@/services/client';
import { OAuthClient } from '@/types';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
    ActionType,
    ModalForm,
    ProFormField,
    ProFormText,
    ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Popconfirm } from 'antd';
import React from 'react';

export type ClientCreateProps = {
    setNewClient: (client: OAuthClient) => void;
    listRef: React.RefObject<ActionType | null>;
};
export type ClientUpdateProps = {
    client: OAuthClient;
    listRef: React.RefObject<ActionType | null>;
};

async function redirectUriValidator(_: unknown, value: string) {
    let validate = true;
    value.split(',').forEach((item: string) => {
        if (!(item.startsWith('http://') || item.startsWith('https://'))) {
            validate = false;
        }
    });
    if (validate) {
        return Promise.resolve();
    }

    return Promise.reject('回调地址格式不正确');
}

export function ClientCreate({ listRef, setNewClient }: ClientCreateProps) {
    async function onFinish(data: Partial<OAuthClient>) {
        const result = await createClient(data);
        setNewClient(result.data);
        listRef.current?.reload();
        return true;
    }

    return (
        <ModalForm<Partial<OAuthClient>>
            width={400}
            onFinish={onFinish}
            trigger={<Button type="primary">新建</Button>}
            modalProps={{ destroyOnHidden: true }}
        >
            <ProFormField
                name="icon"
                label="图标"
                rules={[{ required: true, message: '图标是必填项' }]}
            >
                <Base64ImageUploader />
            </ProFormField>
            <ProFormText
                name="name"
                label="名称"
                rules={[{ required: true, message: '名称是必填项' }]}
            />
            <ProFormTextArea name="description" label="说明" />
            <ProFormText
                name="home"
                label="首页地址"
                rules={[{ type: 'url', message: '链接格式不正确' }]}
            />
            <ProFormText
                name="redirect_uris"
                label="回调地址"
                rules={[
                    { required: true, message: '回调地址是必填项' },
                    { validator: redirectUriValidator },
                ]}
            />
        </ModalForm>
    );
}

export function ClientUpdate({ listRef, client }: ClientUpdateProps) {
    async function onFinish(data: Partial<OAuthClient>) {
        await updateClient({ id: client.id, ...data });
        listRef.current?.reload();
        return true;
    }

    return (
        <ModalForm<Partial<OAuthClient>>
            width={400}
            onFinish={onFinish}
            trigger={<EditOutlined />}
            modalProps={{ destroyOnHidden: true }}
            initialValues={{
                ...client,
                icon: client.icon ?? undefined,
                redirect_uris: client.redirect_uris?.join('\n'),
            }}
        >
            <ProFormField
                name="icon"
                label="图标"
                rules={[{ required: true, message: '图标是必填项' }]}
            >
                <Base64ImageUploader />
            </ProFormField>
            <ProFormText
                name="name"
                label="名称"
                rules={[{ required: true, message: '名称是必填项' }]}
            />
            <ProFormTextArea name="description" label="说明" />
            <ProFormText
                name="home"
                label="首页地址"
                rules={[{ type: 'url', message: '链接格式不正确' }]}
            />
            <ProFormText
                name="redirect_uris"
                label="回调地址"
                rules={[
                    { required: true, message: '回调地址是必填项' },
                    { validator: redirectUriValidator },
                ]}
            />
        </ModalForm>
    );
}

export function ClientDelete({ client, listRef }: ClientUpdateProps) {
    return (
        <Popconfirm
            title="确认删除？"
            okText="删除"
            cancelText="保留"
            onConfirm={() => {
                deleteClient(client.id).then(() => {
                    listRef.current?.reload();
                });
            }}
        >
            <DeleteOutlined />
        </Popconfirm>
    );
}
