import '../assets/css/style.css';

import { FiltersM, ProductsM, CartM, SortM, PageM } from './model';
import { FiltersV } from './view/filtersv';
import { ProductsV } from './view/productsv';
import { FiltersGroupObj, ProductsObj } from './types/types';
import { PageV } from './view/pagev';
import { CartV } from './view/cartv';
import { SearchV } from './view/searchv';
import { SortV } from './view/sortv';


export class FiltersC {
    filtersModel;
    filtersView;
    filtersHTML: Element;
    filters: Array<FiltersGroupObj>;

    constructor(){
        this.filtersModel = new FiltersM;
        this.filtersView = new FiltersV;

        this.filters = this.filtersModel.filters;
        this.filtersHTML = this.filtersView.render(this.filters);

        this.filtersView.listenFilters(this.handleFilters);
        this.filtersView.listenResetFilters(this.resetFilters);

    }


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

        app.renderAppPage();
    }

    resetFilters = () => {
        this.filtersModel.removeFromLocalStorage();
        app.renderAppPage();
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

    arrangeProducts(filters: Array<FiltersGroupObj>, products: Array<ProductsObj>,
        inCart: Array<string>, sortOrder: string, searchWord: string){

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
            } else {
                product.incart = 'no';
            }
        })

        // apply search

        if(searchWord){
            const productsFilteredBySearch = productsFilteredByRanges.filter(product => product.name.toLowerCase().includes(searchWord))
            productsFilteredByRanges = productsFilteredBySearch;
        }

        // apply sorting
        switch(sortOrder){
            case 'name-a':
                productsFilteredByRanges.sort((a, b): number => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                })
            break;

            case 'name-z':
                productsFilteredByRanges.sort((a, b): number => {
                    if (b.name < a.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                })
            break;

            case 'released-new':
                productsFilteredByRanges.sort((a, b): number => {
                    return Number(b.released) - Number(a.released);
                })
            break;

            case 'released-old':
                productsFilteredByRanges.sort((a, b): number => {
                    return Number(a.released) - Number(b.released);
                })
            break;
        }



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
                app.renderAppPage();
            } else {
                this.cartView.showModal();
            }
        }

        if(action === 'remove'){
            this.cartModel.removeFromCart(id);
            app.renderAppPage();
        }
    }

    addCartListeners(){
        this.cartView.listenAddToCart(this.handleCart);
    }
}


class SearchC {
    searchHTML;
    searchView;
    constructor(searchWord: string){
        this.searchView = new SearchV(searchWord);
        this.searchHTML = this.searchView.searchHTML;
        this.searchView.listenSearch(this.handleSearch);
    }

    handleSearch = (str: string): void => {
        app.pageModel.searchWord = str.toLowerCase();
        app.renderAppPage();
    }

    setFocus(){
        this.searchView.setFocus();
    }
}

class SortC {
    sortView;
    sortModel;
    sortHTML;
    sortOrder;
    constructor() {
        this.sortModel = new SortM;
        this.sortOrder = this.sortModel.sortOrder;

        this.sortView = new SortV(this.sortOrder);
        this.sortHTML = this.sortView.sortHTML;
        this.sortView.listenSort(this.handleSort);
    }

    handleSort = (sorting: string): void => {
        this.sortModel.update(sorting);
        app.renderAppPage();
    }
}


class PageC {
    pageModel;
    coordY = 0;

    constructor(){
        this.pageModel = new PageM;
        this.renderAppPage();
    }

    renderAppPage(){

        this.saveScroll();

        const filters = new FiltersC;
        const products = new ProductsC;
        const cart = new CartC;
        const sort = new SortC;

        const search = new SearchC(this.pageModel.searchWord);
        const searchHTML = search.searchHTML;

        const filtersHTML = filters.filtersHTML;
        const cartHTML = cart.cartHTML;
        const sortHTML = sort.sortHTML;


        const arrangedProducts = products.arrangeProducts(filters.filters,
                                            products.products, cart.inCart, sort.sortOrder, this.pageModel.searchWord);

        const productsHTML = products.getHTML(arrangedProducts);

        //console.log(this.filters.filters, this.products.products);

        const pageView = new PageV;
        pageView.renderWholePage(filtersHTML, productsHTML, cartHTML, searchHTML, sortHTML);

        cart.addCartListeners();

        search.setFocus();

        pageView.listenTotalReset(this.totalPageReset);

        this.getScroll();
    }

    totalPageReset = ():void => {
        this.pageModel.totalReset();
    }

    saveScroll(){
        this.coordY = window.scrollY;
        console.log('1',this.coordY)
    }

    getScroll(){
        window.scroll(0, this.coordY);
        console.log('2',this.coordY)
    }
}


const app = new PageC;