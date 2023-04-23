export type ShortInfoEntryTypes = {
  title: string;
  description: string;
};

export interface ResponseTypes<T> {
  data: T;
}

interface ResponsePagingPageableTypes {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: true;
  sort: ResponsePagingSortTypes;
  unpaged: boolean;
}
interface ResponsePagingSortTypes {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface ResponsePagingTypes<T> {
  content: T;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: ResponsePagingPageableTypes;
  size: number;
  sort: ResponsePagingSortTypes;
  totalElements: number;
  totalPages: number;
}

export interface RefTypes {
  id: number;
}
