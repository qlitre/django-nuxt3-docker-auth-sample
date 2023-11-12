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

// GET user/me
export type UserMeResponse = {
    first_name: string;
    last_name: string;
    id: number;
    email: string;
    auth_token?: string;
}
export type UserMeError = {
    data: {
        non_field_errors: string[];
    }
}


// PATCH users/me/
export type UserUpdateResponse = {
    last_name?: string;
    first_name?: string;
}
export type UserUpdateError = {
    data: {
        first_name?: string[];
        last_name?: string[];
        non_field_errors?: string[];
    }
}

// POSt token/login
export type LoginResponse = {
    auth_token: string;
}
export type LoginError = {
    data: {
        non_field_errors: string[];
    }
}

// POST token/logout
export type LogoutResponse = null;

export type LogoutError = {
    data: {
        non_field_errors: string[];
    }
}

// POST users/
export type UserCreateResponse = {
    first_name: string,
    last_name: string,
    email: string,
    id: number
}

export type UserCreateError = {
    data: {
        email?: string[];
        password?: string[];
        first_name?: string[];
        last_name?: string[];
        non_field_errors?: string[];
    }
}


export type UserActivateResponse = null
export type UserActivateError = {
    data: {
        detail?: string
        uid?: string
        token?: string
    }
}

export type ResetPasswordResponse = null
export type ResetPasswordError = {
    data: {
        email?: string[]
    }
}

export type ResetPasswordConfirmResponse = null
export type ResetPasswordConfirmError = {
    data: {
        new_password?: string[]
        re_new_password?: string[]
        uid?: string[]
        token?: string[]
        non_field_errors?: string[]
    }
}

export type SetPasswordResponse = null;
export type SetPasswordError = {
    data: {
        new_password?: string[]
        re_new_password?: string[]
        non_field_errors?: string[]
    }
}