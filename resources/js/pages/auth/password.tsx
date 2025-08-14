import AuthLayout from '@/layouts/auth-layout';
import { passLogin } from '@/services/auth';
import { LockOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Head } from '@inertiajs/react';
import { Button } from 'antd';

export default function Password() {
    return (
        <AuthLayout>
            <Head title="验证密码" />
            <ProForm submitter={false} onFinish={passLogin} layout="vertical" requiredMark={false}>
                <ProFormText.Password
                    label="密码"
                    name="password"
                    fieldProps={{ prefix: <LockOutlined /> }}
                    rules={[{ required: true, message: '请输入密码' }]}
                />
                <Button type="primary" block htmlType="submit">
                    登录
                </Button>
            </ProForm>
        </AuthLayout>
    );
}
