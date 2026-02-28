import type { ApiPaginationMeta } from "../../shared/types/api";

export interface Customer {
  id: number | string;
  full_name?: string;
  email?: string;
  phone?: string;
  description?: string;
  [key: string]: unknown;
}

export interface CustomersResponse {
  data: Customer[];
  meta: ApiPaginationMeta;
}
