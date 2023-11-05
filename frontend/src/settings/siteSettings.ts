// 環境変数がないときは、ローカルホストの8000ポートを指定
export const baseUrl = process.env.BASE_URL || "http://localhost:8000/api"
export const AUTH_BASE_URL = baseUrl + '/auth/'