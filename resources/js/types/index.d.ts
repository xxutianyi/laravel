import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    permissions?: string[];
}

export interface SharedData {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };

    [key: string]: unknown;
}

interface Model {
    id: number | string;
    created_at: string;
    updated_at: string;
}

export interface User extends Model {
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    teams?: Team[];
    permissions?: string[];
}

export interface Team extends Model {
    name: string;
    path: string;
    parent_id?: Team['id'];
    parent?: Team;
    children?: Team[];
}

export interface OAuthClient extends Model {
    id: string;
    name: string;
    icon?: string;
    home?: string;
    tags?: string[];
    description?: string;
    plain_secret?: string;
    revoked: boolean;
    provider?: string;
    owner_id?: string;
    owner_type?: string;
    grant_types?: string[];
    redirect_uris?: string[];
}
