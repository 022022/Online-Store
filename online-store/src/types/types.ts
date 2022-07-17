export interface FiltersGroupObj {
    filtersGroupName: string;
    filters: Array<SingleFilterObj>;
}

export interface SingleFilterObj {
    filterType: string;
    id: string;
    state: string;
    filterAttrs: AttrsObj;
}

export interface AttrsObj {
    [key: string]: string;
}

export interface CallbackHandleFilters {
    (id: string, value: string): void;
}

export interface CallbackLocalStorage {
    (): void;
}

export interface CallbackAddToCart {
    (id: string): void;
}

export interface CallbackSearch {
    (id: string): void;
}

export interface ProductsObj{
    [key: string]: string;
}