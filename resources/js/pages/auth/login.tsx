import AuthLayout from '@/layouts/auth-layout';
import { phoneRegex } from '@/lib/rule';
import { codeLogin, passLogin, verifyCode } from '@/services/auth';
import { LockOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Head } from '@inertiajs/react';
import { Button, message, Tabs, TabsProps } from 'antd';

function PasswordLogin() {
    return (
        <ProForm submitter={false} onFinish={passLogin} layout="vertical" requiredMark={false}>
            <ProFormText
                label="手机号"
                name="phone"
                fieldProps={{ prefix: <MobileOutlined /> }}
                rules={[
                    { required: true, message: '请输入手机号' },
                    { pattern: phoneRegex, message: '手机号格式不正确' },
                ]}
            />
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
    );
}

function MobileLogin() {
    async function handleSendCode(phone: string) {
        await verifyCode({ phone });
        message.success('验证码发送成功');
    }

    return (
        <ProForm submitter={false} onFinish={codeLogin} layout="vertical" requiredMark={false}>
            <ProFormText
                label="手机号"
                name="phone"
                fieldProps={{ prefix: <MobileOutlined /> }}
                rules={[
                    { required: true, message: '请输入手机号' },
                    { pattern: phoneRegex, message: '手机号格式不正确' },
                ]}
            />
            <ProFormCaptcha
                label="验证码"
                name="code"
                phoneName="phone"
                onGetCaptcha={handleSendCode}
                fieldProps={{ prefix: <MailOutlined /> }}
                rules={[{ required: true, message: '请输入验证码' }]}
            />
            <Button type="primary" block htmlType="submit">
                登录
            </Button>
        </ProForm>
    );
}

export default function Login() {
    const tabItems: TabsProps['items'] = [
        {
            key: 'password',
            label: '密码登录',
            children: <PasswordLogin />,
        },
        {
            key: 'mobile',
            label: '手机验证',
            children: <MobileLogin />,
        },
    ];

    return (
        <AuthLayout>
            <Head title="登录" />
            <Tabs centered={true} items={tabItems} />
        </AuthLayout>
    );
}
