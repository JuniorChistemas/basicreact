const AUTH_TOKEN_KEY = 'auth_token'

export const authStore = {
  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  },
  setToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_KEY, token)
  },
  clearToken(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY)
  },
  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(AUTH_TOKEN_KEY))
  },
}
