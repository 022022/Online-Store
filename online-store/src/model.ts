import { filtersConfig } from './data/filters';
import { productsConfig } from './data/products';

export class FiltersM {
    filters;
    constructor(){
        const savedFilters = localStorage.getItem('app-filters') as string;
        this.filters = JSON.parse(savedFilters) || filtersConfig;
    }

    saveToLocalStorage(){
        const data = JSON.stringify(this.filters);
        localStorage.setItem('app-filters', data);

    }

    removeFromLocalStorage(){
        localStorage.removeItem('app-filters');
        location.reload();
    }
}

export class ProductsM {
    products;
    constructor(){
        this.products = productsConfig;
    }
}

export class CartM {
    quantity;
    inCart;
    constructor(){
        if(localStorage.getItem('app-cart')){
            const savedCart = localStorage.getItem('app-cart') as string;
            this.inCart = JSON.parse(savedCart);
            this.quantity = this.inCart.length;

        } else {
            this.quantity = 0;
            this.inCart = [];
            localStorage.setItem('app-cart', JSON.stringify(this.inCart));
        }
    }

    addToCart(id: string) {  // saves to local storage
        let cart = JSON.parse(localStorage.getItem('app-cart') as string);
        cart.push(id);
        localStorage.setItem('app-cart', JSON.stringify(cart));
    }

    removeFromCart(id: string) {
        let cart = JSON.parse(localStorage.getItem('app-cart') as string);
        const newCart = cart.filter((item: string) => item !== id);
        localStorage.setItem('app-cart', JSON.stringify(newCart));
        location.reload();
    }

}

export class SortM {
    sortOrder;
    defaultSorting = 'name-a';
    constructor(){
        if(localStorage.getItem('app-sort')){
            const savedSorting = localStorage.getItem('app-sort') as string;
            this.sortOrder = JSON.parse(savedSorting);
        } else {
            this.sortOrder = this.defaultSorting;
            localStorage.setItem('app-sort', JSON.stringify(this.sortOrder));
        }
    }

    update(sorting: string){
        localStorage.setItem('app-sort', JSON.stringify(sorting));
    }
}