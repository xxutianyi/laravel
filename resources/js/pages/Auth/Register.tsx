import { Base64ImageUploader } from '@/components/xudev/Inputs';
import AuthLayout from '@/layouts/AuthLayout';
import { phoneRegex } from '@/lib/rule';
import { verifyCode } from '@/services/auth';
import { LockOutlined, MailOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import { ProForm, ProFormCaptcha, ProFormField, ProFormText } from '@ant-design/pro-components';
import { Head } from '@inertiajs/react';
import { Button, message } from 'antd';

export default function Register() {
    async function handleSendCode(phone: string) {
        await verifyCode({ phone });
        message.success('验证码发送成功');
    }

    return (
        <AuthLayout>
            <Head title="注册账号" />
            <ProForm submitter={false} autoComplete="off" layout="vertical" requiredMark={false}>
                <ProFormField label="头像" name="avatar">
                    <Base64ImageUploader listType="picture-circle" />
                </ProFormField>
                <ProFormText
                    label="姓名"
                    name="name"
                    fieldProps={{ prefix: <UserOutlined /> }}
                    rules={[{ required: true, message: '请输入姓名' }]}
                />
                <ProFormText.Password
                    label="密码"
                    name="password"
                    fieldProps={{ prefix: <LockOutlined /> }}
                    rules={[{ required: true, message: '请输入密码' }]}
                />
                <ProFormText.Password
                    label="确认密码"
                    name="password_confirmation"
                    fieldProps={{ prefix: <LockOutlined /> }}
                    rules={[{ required: true, message: '请输入密码' }]}
                />
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
                    onGetCaptcha={handleSendCode}
                    phoneName="phone"
                    fieldProps={{ prefix: <MailOutlined /> }}
                    rules={[{ required: true, message: '请输入验证码' }]}
                />
                <Button type="primary" block htmlType="submit">
                    注册
                </Button>
            </ProForm>
        </AuthLayout>
    );
}
