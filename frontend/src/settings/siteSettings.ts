// 環境変数がないときは、ローカルホストの8000ポートを指定
export const baseUrl = process.env.BASE_URL || "/api"
export const ACCOUNT_BASE_URL = baseUrl + '/account/'