import { API_BASE_URL } from '../../../shared/constants/api'
import type { ApiErrorResponse } from '../../../shared/types/api'
import type { LoginRequest, LoginResponse } from '../types'

export async function loginUser(payload: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = (await response.json()) as LoginResponse | ApiErrorResponse

  if (!response.ok || !('token' in data)) {
    throw new Error(data.message ?? 'No se pudo iniciar sesión')
  }

  return data
}
