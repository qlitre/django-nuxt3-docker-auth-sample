export type User = {
    id?: number;
    last_name?: string;
    first_name?: string;
    email?: string;
    auth_token?: string;
}

export type CheckAuthResponse = {
    isAuthenticated: boolean;
}