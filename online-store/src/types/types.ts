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
    /* min: string,
    step: string,
    max: string,
    valueFrom: string,
    valueTo: string,
    name:  string,
    */
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

export interface CallbackSort {
    (id: string): void;
}

export interface ProductsObj {
    id: string,
    name: string,
    brand: string,
    color: string,
    url: string,
    bandmaterial: string,
    released: string,
    instock: string,
    incart: string,
    [key: string]: string;
}
