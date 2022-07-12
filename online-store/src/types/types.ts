export interface FiltersGroupObj {
    filtersGroupName: string;
    filters: Array<SingleFilterObj>;
}

export interface SingleFilterObj {
    filterType: string;
    id: string;
    filterAttrs: AttrsObj;
}

export interface AttrsObj {
    [key: string]: string;
}