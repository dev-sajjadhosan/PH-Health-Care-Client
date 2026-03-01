export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<TData = unknown> {
  data: TData;
  success: boolean;
  message: string;
  meta?: PaginationMeta;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
}
