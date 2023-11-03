import { useAuthStore } from "~/stores/auth"
import { useUserStore } from "@/stores/user";
import { ACCOUNT_BASE_URL } from "~/settings/siteSettings";

type BodyType = { [key: string]: any } | null;


export default async (endpoint: string, method = 'GET', body: BodyType = null) => {
  const baseURL = ACCOUNT_BASE_URL;
  const authStore = useAuthStore();
  const userStore = useUserStore();
  const { data, pending, error, refresh } = await useFetch(baseURL + endpoint, {
    async onRequest({ request, options }) {
      let csrfToken = useCookie('csrftoken')
      if (!authStore.isAuthenticated) {
        await useFetch(baseURL + 'csrf_cookie/', { credentials: 'include' })
        csrfToken = useCookie('csrftoken')
      }

      if (!csrfToken.value) {
        throw new Error('CSRF token is missing!');
      }

      // Set the request headers
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken.value
      },
        options.credentials = 'include',
        options.method = method,
        options.body = body
    },


    async onResponseError({ request, response, options }): Promise<void> {
      type Res = {
        isAuthenticated: boolean
      }
      if (response.status === 403) {
        const { data } = await useFetch<Res>(baseURL + "checkauth/", { credentials: 'include' })
        if (!data.value) {
          throw new Error('ユーザー認証情報の取得に失敗しました');
        }
        if (data.value.isAuthenticated === false) {
          authStore.setAuthenticated(false)
          userStore.$reset();
          authStore.$reset();
          navigateTo("/account/login", { replace: true })
          return;
        }
      }
    }
  })
  return { data, pending, error, refresh }
}