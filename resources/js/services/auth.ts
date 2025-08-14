import axios from '@/lib/axios';
import { router } from '@inertiajs/react';
import qs from 'qs';

export type VerifyCode = { phone: string };
export type CodeLogin = { phone: string; code: string };
export type PassLogin = { phone: string; password: string };

export async function passLogin(values: PassLogin) {
    const redirectUri = qs.parse(window.location.search.slice(1)).redirectUri;
    axios.post('/api/auth/login', values).then(() => {
        window.location.href = (redirectUri as string) ?? '/apps';
    });
}

export async function codeLogin(values: CodeLogin) {
    const redirectUri = qs.parse(window.location.search.slice(1)).redirectUri;
    axios.post('/api/auth/login', values).then(() => {
        window.location.href = (redirectUri as string) ?? '/apps';
    });
}

export async function logout() {
    router.post('/api/auth/logout');
}

export async function verifyCode(values: VerifyCode) {
    return (await axios.post('/api/auth/verify-code', values)).data;
}
