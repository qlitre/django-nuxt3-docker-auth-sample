export type User = {
    id?: number;
    last_name?: string;
    first_name?: string;
    email?: string;
    is_staff?: boolean;
}

export type CheckAuthResponse = {
    isAuthenticated: boolean;
}