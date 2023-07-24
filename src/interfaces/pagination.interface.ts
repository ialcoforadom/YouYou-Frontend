export interface Filter extends PaginationRequest {
  General?: string;
  RoleId?: string;
}

export interface Pagination {
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
  sortBy?: string;
  descending?: boolean;
}

export interface PaginationRequest {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  descending?: boolean;
}

export interface PaginationResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  firstPage: string;
  lastPage: string;
  totalPages: number;
  totalRecords: number;
  nextPage: null | string;
  previousPage: null | string;
}
