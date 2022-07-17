import '../assets/css/style.css';

import { FiltersM, ProductsM, CartM } from './model';
import { FiltersV } from './view/filtersv';
import { ProductsV } from './view/productsv';
import { FiltersGroupObj, ProductsObj } from './types/types';
import { PageV } from './view/pagev';
import { CartV } from './view/cartv';

export class FiltersC {
    filtersModel;
    filtersView;
    filtersHTML: Element;
    filters: Array<FiltersGroupObj>;

    constructor(){
        this.filtersModel = new FiltersM;
        this.filtersView = new FiltersV;
        //this.filters = this.arrangeFilters(this.filtersModel.filters);
        this.filters = this.filtersModel.filters;
        this.filtersHTML = this.filtersView.render(this.filters);

        this.filtersView.listenFilters(this.handleFilters);
        this.filtersView.listenResetFilters(this.resetFilters);

    }

    //arrangeFilters(filters: Array<FiltersGroupObj>){
        // some logic
    //    return filters;
    //}

    handleFilters = (id: string, value: string): void => {
        for(const group of this.filters){
            for(const filter of group.filters){
                if (filter.id === id){

                    switch(filter.filterType){

                        case 'checkbox':
                            switch(filter.state){
                                case 'off': filter.state = 'on';
                                    break;
                                case 'on': filter.state = 'off';
                                    break;
                                default:
                                    filter.state = value;
                            }

                        case 'range':
                            filter.filterAttrs.valueFrom = value.split('-')[0];
                            filter.filterAttrs.valueTo = value.split('-')[1];
                    }

                }
            }
        }

        //this.filtersModel.saveToLocalStorage(JSON.stringify(this.filters));

        this.filtersModel.filters = this.filters;
        this.filtersModel.saveToLocalStorage();

        new PageC;
    }

    resetFilters = () => {
        this.filtersModel.removeFromLocalStorage();
    }
}


export class ProductsC {
    productsModel = new ProductsM;
    products: Array<ProductsObj>;

    constructor(){
        this.products = this.productsModel.products;
        //this.productsHTML = this.productsView.render(this.products);

        //this.filtersView.listenProducts(this.putToCart);
    }

    arrangeProducts(filters: Array<FiltersGroupObj>, products: Array<ProductsObj>, inCart: Array<string>){

    // 1)get simpler version of filters data structure - array of objects with only checked checkboxes
        let filtersGroupsOfConditions = [];

        let rangeFilters = [];

        for(const group of filters){
            let conditionsGroup = [];
            for(const filter of group.filters){
                switch(filter.filterType){
                    case 'checkbox':
                        if (filter.state ==='on') {

                            const key = filter.id.split('-')[0].toLowerCase();
                            const value = filter.id.split('-')[1].toLowerCase();

                            const obj = {[key]: value};
                            conditionsGroup.push(obj);
                        }
                        break;
                    case 'range':
                        rangeFilters.push( [filter.id, filter.filterAttrs.valueFrom, filter.filterAttrs.valueTo] );

                        break;
                }
            }

            filtersGroupsOfConditions.push(conditionsGroup);
        }

     //console.log('filtersGroupsOfConditions', filtersGroupsOfConditions);
     //console.log('rangeFilters', rangeFilters);

    // 2) filter by checkboxes
    // [Object.keys(condition)[0]] === checkbox id

        let productsFilteredByCheckboxes = products;

        for (const conditionsGroup of filtersGroupsOfConditions) {
            if(conditionsGroup.length === 0) continue;

            const filteredProductsByGroup = productsFilteredByCheckboxes.filter((product) => {
                for(const condition of conditionsGroup){

                    if (product[Object.keys(condition)[0]] === Object.values(condition)[0]){
                        return true;
                    }
                }
            })
            productsFilteredByCheckboxes = filteredProductsByGroup;
        }

        // now all checkboxes filters have been applied
        // rangeFilters = array of arrays [id, from, to]

        let productsFilteredByRanges = productsFilteredByCheckboxes;

        for(const rangeFilter of rangeFilters){
            const productsTemp = productsFilteredByRanges.filter((product) => {
                const id = rangeFilter[0];
                const from = Number(rangeFilter[1]);
                const to = Number(rangeFilter[2]);
                const value = Number(product[id]);

                if (value >= from && value <= to){
                    return true;
                }
            });
            productsFilteredByRanges = productsTemp;
        }

        // all filters applied, filtered products are now in 'productsFilteredByRanges'

        productsFilteredByRanges.forEach(product => {
            if (inCart.includes(product.id)){
                product.incart = 'yes';
            }
        })

        return productsFilteredByRanges;

    }

    getHTML(arrangedProducts: Array<ProductsObj>)   {
        const productsView = new ProductsV(arrangedProducts);
        return productsView.productsHTML;
    }

}

class CartC {
    cartHTML: Element;
    cartView;
    cartModel;
    cartQuantity;
    inCart;

    constructor(){
        this.cartModel = new CartM;
        this.cartQuantity = this.cartModel.quantity;
        this.inCart = this.cartModel.inCart;
        this.cartView = new CartV(this.cartQuantity);
        this.cartHTML = this.cartView.cartHTML;
    }


    handleCart = (itemId: string): void => {

        const action = itemId.split('-')[0];
        const id = itemId.split('-')[1];

        if(action === 'add'){
            if (this.cartQuantity < 20){
                this.cartModel.addToCart(id);
                new PageC;
            } else {
                this.cartView.showModal();
            }
        }

        if(action === 'remove'){
            this.cartModel.removeFromCart(id);
            new PageC;
        }
    }

    addCartListeners(){
        this.cartView.listenAddToCart(this.handleCart);
    }
}


class PageC {
    filters;
    products;
    pageView;
    cart;

    constructor(){
        this.filters = new FiltersC;
        this.products = new ProductsC;
        this.cart = new CartC;

        this.pageView = new PageV;

        const filtersHTML = this.filters.filtersHTML;
        const cartHTML = this.cart.cartHTML;

        const arrangedProducts = this.products.arrangeProducts(this.filters.filters, this.products.products, this.cart.inCart);
        const productsHTML = this.products.getHTML(arrangedProducts);

        //console.log(this.filters.filters, this.products.products);

        this.pageView.renderWholePage(filtersHTML, productsHTML, cartHTML);

        this.cart.addCartListeners();
    }
}


new PageC;