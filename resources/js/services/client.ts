import axios, { ApiResponse, PagedResponse } from '@/lib/axios';
import { OAuthClient } from '@/types';

export async function indexClients(params: Record<string, any>) {
    return (await axios.get<PagedResponse<OAuthClient>>('/api/clients', { params })).data;
}

export async function createClient(data: Partial<OAuthClient>) {
    return (await axios.post<ApiResponse<OAuthClient>>('/api/clients', data)).data;
}

export async function updateClient(data: Partial<OAuthClient>) {
    return (await axios.put<ApiResponse<OAuthClient>>(`/api/clients/${data.id}`, data)).data;
}

export async function deleteClient(clientId: OAuthClient['id']): Promise<void> {
    await axios.delete(`/api/clients/${clientId}`);
}
