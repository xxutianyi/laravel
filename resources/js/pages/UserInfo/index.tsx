import { IconLabel } from '@/components/xudev/Label';
import { SpaceX, SpaceY } from '@/components/xudev/Layout';
import useUserInfo from '@/hooks/useUserInfo';
import AppLayout from '@/layouts/AppLayout';
import { phoneRegex } from '@/lib/rule';
import { PasswordUpdate, updatePassword, updateUserInfo } from '@/services/profile';
import styles from '@/styles/page.userinfo.module.css';
import { User } from '@/types';
import { ClusterOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { ModalForm, ProCard, ProFormText } from '@ant-design/pro-components';
import { App, Button } from 'antd';

export default function Userinfo() {
    const { user, UserAvatar } = useUserInfo();
    const { message } = App.useApp();

    async function onFinish(data: Partial<User>) {
        await updateUserInfo({ ...user, ...data });
        window.location.reload();
        return true;
    }

    async function onPasswordFinish(data: PasswordUpdate) {
        await updatePassword(data);
        message.success('密码修改成功');
        window.location.reload();
        return true;
    }

    function Update() {
        return (
            <ModalForm<Partial<User>>
                width={400}
                onFinish={onFinish}
                initialValues={user}
                trigger={<Button>修改信息</Button>}
                modalProps={{ destroyOnHidden: true }}
            >
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

    function Password() {
        return (
            <ModalForm<PasswordUpdate>
                width={400}
                onFinish={onPasswordFinish}
                initialValues={user}
                trigger={<Button>修改密码</Button>}
                modalProps={{ destroyOnHidden: true }}
            >
                <ProFormText
                    label="当前密码"
                    name="current_password"
                    fieldProps={{ type: 'password' }}
                />
                <ProFormText label="新密码" name="password" fieldProps={{ type: 'password' }} />
                <ProFormText
                    label="确认新密码"
                    name="password_confirmation"
                    fieldProps={{ type: 'password' }}
                />
            </ModalForm>
        );
    }

    return (
        <AppLayout>
            <SpaceY className="mx-auto max-w-6xl">
                <ProCard
                    title="账号信息"
                    subTitle={<span className="font-mono text-xs">{user?.id}</span>}
                    extra={
                        <SpaceX>
                            <Update />
                            <Password />
                        </SpaceX>
                    }
                >
                    <SpaceY className={styles.user}>
                        <UserAvatar className="mx-auto size-24" />
                        <h2 className={styles.name}>{user?.name}</h2>
                        <SpaceX className={styles.info}>
                            <IconLabel icon={<MobileOutlined />}>
                                {user?.phone ?? '未设置手机号'}
                            </IconLabel>
                            <IconLabel icon={<MailOutlined />}>
                                {user?.email ?? '未设置邮箱'}
                            </IconLabel>
                        </SpaceX>
                        <SpaceY>
                            {user?.teams?.map((t, index) => (
                                <IconLabel
                                    as="p"
                                    key={index}
                                    icon={<ClusterOutlined />}
                                    className="text-center text-base"
                                >
                                    {t.path}
                                </IconLabel>
                            ))}
                        </SpaceY>
                    </SpaceY>
                </ProCard>
                <ProCard title="操作记录"></ProCard>
            </SpaceY>
        </AppLayout>
    );
}
