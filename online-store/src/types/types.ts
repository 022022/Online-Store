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


export interface ProductsObj{
    [key: string]: string;
}