export interface ApiErrorResponse {
  message?: string;
}

export interface ApiPaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
