import { useAuthStore } from "~/stores/auth";
import { useUserStore } from "@/stores/user";
import { AUTH_BASE_URL } from "~/settings/siteSettings";
import type {
  LoginResponse,
  LoginError,
  UserMeResponse,
  UserMeError,
  UserUpdateResponse,
  UserUpdateError,
  UserCreateResponse,
  UserCreateError,
  UserActivateResponse,
  UserActivateError,
  ResetPasswordResponse,
  ResetPasswordError,
  ResetPasswordConfirmResponse,
  ResetPasswordConfirmError,
  SetPasswordResponse,
  SetPasswordError,
  LogoutResponse,
  LogoutError
} from "~/types/account";

const getauthToken = () => {
  const userStore = useUserStore()
  return userStore.user.auth_token
}

/**
 * ログインする
 */
export const useLogin = async (body: { email: string, password: string }) => {
  const endpoint = 'token/login/'
  const url = AUTH_BASE_URL + endpoint
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const { data, error } = await useFetch<LoginResponse, LoginError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  } else {
    return { data: data.value }
  }
}

/**
 * ユーザー情報を取得する
 */
export const useGetUser = async (token: string) => {
  const endpoint = 'users/me/'
  const url = AUTH_BASE_URL + endpoint
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  }
  const { data, error } = await useFetch<UserMeResponse, UserMeError>(url,
    { headers: headers, key: crypto.randomUUID() }
  )
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * ユーザー名を変更する
 */
export const useUpdateUserName = async (body: { first_name: string, last_name: string }) => {
  const endpoint = 'users/me/'
  const url = AUTH_BASE_URL + endpoint
  const token = getauthToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  }
  const { data, error } = await useFetch<UserUpdateResponse, UserUpdateError>(url, {
    method: 'PATCH',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * ログアウトする
 */
export const useLogout = async () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const endpoint = 'token/logout/'
  const url = AUTH_BASE_URL + endpoint
  const token = getauthToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
    key: crypto.randomUUID(),
  }
  const { data, error } = await useFetch<LogoutResponse, LogoutError>(url, {
    method: 'POST',
    headers: headers
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  authStore.setAuthenticated(false)
  authStore.$reset();
  userStore.$reset();
  return { data: data.value }
}

/**
 * パスワードリセットメールを送信する
 */
export const useSendPasswordResetEmail = async (body: { email: string }) => {
  const endpoint = 'users/reset_password/'
  const url = AUTH_BASE_URL + endpoint
  const headers = {
    'Content-Type': 'application/json',
  }
  const { data, error } = await useFetch<ResetPasswordResponse, ResetPasswordError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * パスワードリセットを実行する
 */
export const useResetPasswordConfirm = async (body: { uid: string, token: string, new_password: string, re_new_password: string }) => {
  const endpoint = 'users/reset_password_confirm/'
  const url = AUTH_BASE_URL + endpoint
  const headers = {
    'Content-Type': 'application/json',
  }
  const { data, error } = await useFetch<ResetPasswordConfirmResponse, ResetPasswordConfirmError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * ユーザー登録
 */
export const useUserCreate = async (body: { email: string, first_name: string, last_name: string, password: string, re_password: string }) => {
  const endpoint = 'users/'
  const url = AUTH_BASE_URL + endpoint
  const headers = {
    'Content-Type': 'application/json',
  }
  const { data, error } = await useFetch<UserCreateResponse, UserCreateError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * ユーザーを有効化する
 */
export const useUserActivate = async (body: { uid: string, token: string }) => {
  const endpoint = 'users/activation/'
  const url = AUTH_BASE_URL + endpoint
  const headers = {
    'Content-Type': 'application/json',
  }
  const { data, error } = await useFetch<UserActivateResponse, UserActivateError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}

/**
 * パスワードを変更する
 */
export const useSetPassword = async (body: { current_password: string, new_password: string }) => {
  const endpoint = 'users/set_password/'
  const url = AUTH_BASE_URL + endpoint
  const token = getauthToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`,
  }
  const { data, error } = await useFetch<SetPasswordResponse, SetPasswordError>(url, {
    method: 'POST',
    headers: headers,
    body: body,
    key: crypto.randomUUID(),
  })
  if (error.value) {
    return { error: error.value.data, data: null }
  }
  return { data: data.value }
}