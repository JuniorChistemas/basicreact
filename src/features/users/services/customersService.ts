import { authStore } from "../../../app/store";
import { API_BASE_URL } from "../../../shared/constants/api";
import type { ApiErrorResponse } from "../../../shared/types/api";
import type { CustomersResponse } from "../types";

export async function getCustomers(page = 1): Promise<CustomersResponse> {
  const token = authStore.getToken();

  if (!token) {
    throw new Error("Sesión expirada. Inicia sesión nuevamente.");
  }

  const response = await fetch(`${API_BASE_URL}/api/customers?page=${page}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await response.json()) as CustomersResponse | ApiErrorResponse;

  if (!response.ok || !("data" in data)) {
    const errorMessage = "message" in data ? data.message : null;
    throw new Error(errorMessage ?? "No se pudieron cargar los clientes");
  }

  return data;
}
