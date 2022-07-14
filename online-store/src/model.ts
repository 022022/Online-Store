import { filtersConfig } from './data/filters';
import { productsConfig } from './data/products';

export class FiltersM {
    filters;
    constructor(){
        const savedFilters = localStorage.getItem('app-filters') as string;
        this.filters = JSON.parse(savedFilters) || filtersConfig;
    }

    saveToLocalStorage(data: string){
        localStorage.setItem('app-filters', data);
    }

    removeFromLocalStorage(name: string){
        localStorage.removeItem(name);
    }
}

export class ProductsM {
    products;
    constructor(){
        const savedProducts = localStorage.getItem('app-products') as string;
        this.products = JSON.parse(savedProducts) || productsConfig;
    }

    saveToLocalStorage(data: string){
        localStorage.setItem('app-products', data);
    }

    removeFromLocalStorage(name: string){
        localStorage.removeItem(name);
    }
}