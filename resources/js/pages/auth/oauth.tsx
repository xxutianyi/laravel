import AuthLayout from '@/layouts/auth-layout';
import { csrf_token } from '@/lib/csrf';
import styles from '@/styles/layout.auth.module.css';
import { OAuthClient, User } from '@/types';
import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, List } from 'antd';

type OAuthPageProps = {
    user: User;
    state: string;
    scopes: { id: string; description: string }[];
    authToken: string;
    client: OAuthClient;
};

export default function OAuth({ scopes, authToken, client, state }: OAuthPageProps) {
    return (
        <AuthLayout noHeader>
            <header className={styles.header}>
                <img src={client.icon} className="h-12 w-12 rounded-xl bg-gray-200" alt="logo" />
                <h1 className={styles.title}>{client.name}</h1>
            </header>
            <div className="w-2xs mx-auto flex flex-col gap-y-4">
                <span className="text-center text-base text-gray-800">
                    授权&nbsp;{client.name}&nbsp;获取您的信息
                </span>
                <List bordered>
                    {scopes.map((scope, index) => (
                        <List.Item key={index}>
                            <span>
                                {index + 1}.&nbsp;{scope.description}
                            </span>
                            <CheckCircleTwoTone />
                        </List.Item>
                    ))}
                </List>
                <div className="mt-4 grid grid-cols-2 gap-x-2">
                    <form
                        method="post"
                        className="contents"
                        action={route('passport.authorizations.approve')}
                    >
                        <input type="hidden" name="state" value={state} />
                        <input type="hidden" name="client_id" value={client.id} />
                        <input type="hidden" name="auth_token" value={authToken} />
                        <input type="hidden" name="_token" value={csrf_token()} />
                        <Button type="primary" htmlType="submit">
                            继续登录
                        </Button>
                    </form>
                    <form
                        method="post"
                        className="contents"
                        action={route('passport.authorizations.deny')}
                    >
                        <input type="hidden" name="state" value={state} />
                        <input type="hidden" name="client_id" value={client.id} />
                        <input type="hidden" name="auth_token" value={authToken} />
                        <input type="hidden" name="_method" value="DELETE" />
                        <input type="hidden" name="_token" value={csrf_token()} />
                        <Button type="primary" danger htmlType="submit">
                            拒绝
                        </Button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
