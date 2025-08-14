import axios, { ApiResponse } from '@/lib/axios';
import { User } from '@/types';

export async function getUserInfo() {
    return (await axios.get<ApiResponse<User>>('/api/profile')).data;
}

export async function updateUserInfo(data: Partial<User>) {
    return (await axios.put<ApiResponse<User>>('/api/profile', data)).data;
}

export type PasswordUpdate = { password: string; password_confirmation: string };

export async function updatePassword(data: PasswordUpdate) {
    return (await axios.put<ApiResponse>('/api/password', data)).data;
}
