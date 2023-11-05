import { useAuthStore } from "~/stores/auth"
import { useUserStore } from "@/stores/user";
import { AUTH_BASE_URL } from "~/settings/siteSettings";


const getauthToken = () => {
  const userStore = useUserStore()
  return userStore.user.auth_token
}

type Headers = {
  'Content-Type': string;
  Authorization?: string;
}

type BodyType = { [key: string]: any } | null;

/**
 * リクエストを送信する
 */
const baseFetch = async (url: string, method: string, body: BodyType = {}, useToken: boolean = false, authToken: string = '') => {

  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };

  if (authToken) {
    headers['Authorization'] = `Token ${authToken}`;
  } else if (useToken) {
    const token = getauthToken();
    headers['Authorization'] = `Token ${token}`;
  }

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers,
  };

  if (method !== 'GET') {
    fetchOptions['body'] = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      // Error body might not be JSON
      const errorText = await response.text();
      try {
        const errorBody = JSON.parse(errorText); // Try parsing as JSON
        return { status: response.status, body: errorBody };
      } catch {
        return { status: response.status, body: errorText }; // Not JSON, return as text
      }
    }

    const contentType = response.headers.get("Content-Type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      // If not JSON, read as text
      data = await response.text();
    }
    return { status: response.status, body: data };

  } catch (error) {
    console.error("Network error:", error);
    return { status: 0, body: null };
  }
}

/**
 * ログインする
 */
export const useLogin = async (body: { email: string, password: string }) => {
  const endpoint = 'token/login/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body)
}

/**
 * ユーザー情報を取得する
 */
export const useGetUser = async (token: string) => {
  const endpoint = 'users/me/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'GET', {}, false, token)
}

/**
 * ユーザー名を変更する
 */
export const useUpdateUserName = async (body: { first_name: string, last_name: string }) => {
  const endpoint = 'users/me/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'PATCH', body, true)
}

/**
 * ログアウトする
 */
export const useLogout = async () => {
  const userStore = useUserStore()
  const authStore = useAuthStore()
  const endpoint = 'token/logout/'
  const url = AUTH_BASE_URL + endpoint
  const res = await baseFetch(url, 'POST', {}, true)
  authStore.setAuthenticated(false)
  authStore.$reset();
  userStore.$reset();
  return res
}

/**
 * パスワードリセットメールを送信する
 */
export const useSendPasswordResetEmail = async (body: { email: string }) => {
  const endpoint = 'users/reset_password/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body)
}

/**
 * パスワードリセットを実行する
 */
export const useResetPasswordConfirm = async (body: { uid: string, token: string, new_password: string, re_new_password: string }) => {
  const endpoint = 'users/reset_password_confirm/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body)
}

/**
 * ユーザー登録
 */
export const useUserCreate = async (body: { email: string, first_name: string, last_name: string, password: string, re_password: string }) => {
  const endpoint = 'users/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body)
}

/**
 * ユーザーを有効化する
 */
export const useUserActivate = async (body: { uid: string, token: string }) => {
  const endpoint = 'users/activation/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body)
}

/**
 * パスワードを変更する
 */
export const useSetPassword = async (body: { current_password: string, new_password: string }) => {
  const endpoint = 'users/set_password/'
  const url = AUTH_BASE_URL + endpoint
  return await baseFetch(url, 'POST', body, true)
}