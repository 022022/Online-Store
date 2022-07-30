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

export interface CallbackSort {
    (id: string): void;
}

export interface ProductsObj {
    id: string;
    name: string;
    brand: string;
    color: string;
    url: string;
    bandmaterial: string;
    released: string;
    instock: string;
    incart: string;
    [key: string]: string;
}

export interface CartModel {
    quantity: number;
    inCart: string[];
    addToCart(id: string): void;
    removeFromCart(id: string): void;
}

export interface CartView {
    cartHTML: Element;
    warning: Element;
    createCart(cartQuantity: number): void;
    listenAddToCart(handler: CallbackAddToCart): void;
    showModal(): void;
}

export interface App {
    (): void;
}

export interface PageModel {
    searchWord: string;
    totalReset(): void;
}

export interface FiltersModel {
    filters: FiltersGroupObj[];
    saveToLocalStorage(): void;
    removeFromLocalStorage(): void;
}

export interface FiltersView {
    filtersHTML: Element;
    resetButton: Element;
    filtersControls: Element;
    render(filters: Array<FiltersGroupObj>): Element;
    fillSliderFromTo(inputFrom: HTMLInputElement, inputTo: HTMLInputElement): void;
    listenSliderToDrawMove(): void;
    listenFilters(handler: CallbackHandleFilters): void;
    listenResetFilters(handler: CallbackLocalStorage): void;
}

export interface ProductsModel {
    products: ProductsObj[];
}

export interface ProductsView {
    productsHTML: Element;
    render(arrangedProducts: Array<ProductsObj>): void;
}

export interface SearchView {
    searchHTML: Element;
    searchField: HTMLInputElement;
    renderSearch(searchWord: string): void;
    listenSearch(handler: CallbackSearch): void;
    setFocus(): void;
}

export interface PageController {
    pageModel: PageModel;
    coordY: number;
    renderAppPage(): void;
    totalPageReset(): void;
    saveScroll(): void;
    getScroll(): void;
}

export interface SortModel {
    sortOrder: string;
    defaultSorting: string;
    update(sorting: string): void;
}

export interface Option {
    value: string;
    text: string;
}

export interface SortView {
    sortHTML: Element;
    options: Option[];
    renderSorting (sorting: string): void;
    listenSort(handler: CallbackSort): void;
}
