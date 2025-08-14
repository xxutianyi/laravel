import axios, { ApiResponse, PagedResponse } from '@/lib/axios';
import { Team, User } from '@/types';

export async function indexTeams(params: Record<string, any>) {
    return (await axios.get<PagedResponse<Team>>('/api/teams', { params })).data;
}

export async function listTeams(params: Record<string, any>) {
    return (await axios.get<ApiResponse<Team[]>>('/api/teams/options', { params })).data;
}

export async function createTeam(data: Partial<Team>) {
    return (await axios.post<ApiResponse<Team>>('/api/teams', data)).data;
}

export async function updateTeam(data: Partial<Team>) {
    return (await axios.put<ApiResponse<Team>>(`/api/teams/${data.id}`, data)).data;
}

export async function deleteTeam(teamId: Team['id']): Promise<void> {
    await axios.delete(`/api/teams/${teamId}`);
}

export async function indexUsers(params: Record<string, any>) {
    return (await axios.get<PagedResponse<User>>('/api/users', { params })).data;
}

export async function createUser(data: Partial<Team>) {
    return (await axios.post<ApiResponse<User>>('/api/users', data)).data;
}

export async function updateUser(data: Partial<User>) {
    return (await axios.put<ApiResponse<User>>(`/api/users/${data.id}`, data)).data;
}

export async function deleteUser(userId: User['id']): Promise<void> {
    await axios.delete(`/api/users/${userId}`);
}
