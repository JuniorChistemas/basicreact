import { useCallback, useState } from "react";
import { authStore } from "../../../app/store";
import { loginUser } from "../services/authService";
import type { LoginRequest } from "../types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(payload);
      authStore.setToken(response.token);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authStore.clearToken();
  }, []);

  return {
    loading,
    error,
    login,
    logout,
    isAuthenticated: authStore.isAuthenticated(),
  };
}
