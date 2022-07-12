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

export interface Callback {
    (id: string, value: string): void;
}