import RootLayout from '@/layouts/RootLayout';
import { Head } from '@inertiajs/react';
import { Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';

export default function ErrorPage({ status = 500 }: { status: number }) {
    const title = {
        500: '服务器错误',
        503: '服务暂不可用',
        404: '您访问的页面不存在',
        403: '权限不足，禁止访问',
    }[status] as string;

    const resultStatus = {
        500: 500,
        503: 500,
        404: 404,
        403: 403,
    }[status] as ResultStatusType;

    return (
        <RootLayout>
            <Head title={`${status}`} />
            <div className="flex h-screen w-screen">
                <Result className="m-auto" title={status} subTitle={title} status={resultStatus} />
            </div>
        </RootLayout>
    );
}
