import '../assets/css/style.css';

import { FiltersM, ProductsM } from './model';
import { FiltersV } from './view/filtersv';
import { ProductsV } from './view/productsv';
import { FiltersGroupObj, ProductsObj } from './types/types';
import { PageV } from './view/pagev';

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

                    //console.log('c', filter.id);

                    switch(filter.state){
                        case 'off': filter.state = 'on';
                            break;
                        case 'on': filter.state = 'off';
                            break;
                        default:
                            filter.state = value;
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
        location.reload();
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

    arrangeProducts(filters: Array<FiltersGroupObj>, products: Array<ProductsObj>){

        let filtersGroupsOfConditions = [];

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
                    case 'range': // todo
                        break;
                }
            }

            filtersGroupsOfConditions.push(conditionsGroup);
        }

        let productsTemp = products;

        for (const conditionsGroup of filtersGroupsOfConditions) {
            if(conditionsGroup.length === 0) continue;

            const filteredProductsByGroup = productsTemp.filter((product) => {
                for(const condition of conditionsGroup){
                    console.log('condition', condition);
                    if(product[Object.keys(condition)[0]] === Object.values(condition)[0]){
                        return true;
                    }
                }
            })
            productsTemp = filteredProductsByGroup;

        }

        return productsTemp;
    }

    getHTML(arrangedProducts: Array<ProductsObj>)   {
        const productsView = new ProductsV(arrangedProducts);
        return productsView.productsHTML;
    }

}


class PageC {
    filters;
    products;
    pageView;

    constructor(){
        this.filters = new FiltersC;
        this.products = new ProductsC;

        this.pageView = new PageV;

        const filtersHTML = this.filters.filtersHTML;

        const arrangedProducts = this.products.arrangeProducts(this.filters.filters, this.products.products);
        const productsHTML = this.products.getHTML(arrangedProducts);

        this.pageView.renderWholePage(filtersHTML, productsHTML);
    }
}


new PageC;