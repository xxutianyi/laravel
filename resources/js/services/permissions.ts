import axios, { ApiResponse } from '@/lib/axios';

export async function getAllPermissions() {
    return (await axios.get<ApiResponse<string[]>>('/api/permissions')).data;
}
