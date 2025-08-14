import useUserInfo from '@/hooks/useUserInfo';
import logo from '@/images/icon.png';
import RootLayout from '@/layouts/RootLayout';
import routes from '@/routes';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
    MenuDataItem,
    PageContainer,
    ProConfigProvider,
    ProLayout,
} from '@ant-design/pro-components';
import { Link, router } from '@inertiajs/react';
import { ConfigProvider, Dropdown, MenuProps } from 'antd';
import { PropsWithChildren, ReactNode } from 'react';

export default ({ children }: PropsWithChildren) => {
    const { user, UserAvatar } = useUserInfo();
    const APP_NAME = import.meta.env.VITE_APP_NAME;

    const dropdownItems: MenuProps['items'] = [
        {
            key: 'info',
            icon: <UserOutlined />,
            label: <a onClick={() => router.get('/userinfo')}>个人信息</a>,
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: <a onClick={() => router.post('/api/auth/logout')}>退出登录</a>,
        },
    ];

    function avatarRender(_: any, dom: ReactNode) {
        return (
            <Dropdown className="text-black" menu={{ items: dropdownItems }}>
                {dom}
            </Dropdown>
        );
    }

    function menuItemRender(item: MenuDataItem, defaultDom: ReactNode) {
        const Component = item.isUrl ? 'a' : Link;

        return (
            <Component href={item.path ?? ''} target="_blank">
                {defaultDom}
            </Component>
        );
    }

    return (
        <RootLayout>
            <ProConfigProvider>
                <ConfigProvider>
                    <ProLayout
                        layout="mix"
                        logo={logo}
                        title={APP_NAME}
                        avatarProps={{
                            src: <UserAvatar />,
                            title: user?.name,
                            style: { color: 'black' },
                            render: avatarRender,
                        }}
                        menuItemRender={menuItemRender}
                        route={{ path: '/', routes: routes }}
                    >
                        <PageContainer className="h-[calc(100svh-64px)] w-[calc(100svw-215px)]">
                            {children}
                        </PageContainer>
                    </ProLayout>
                </ConfigProvider>
            </ProConfigProvider>
        </RootLayout>
    );
};
