import { FiltersM, ProductsM } from './model';
import { FiltersV } from './view/filtersv';
import { ProductsV } from './view/productsv';
import { FiltersGroupObj, ProductsObj } from './types/types';
import { PageV } from './view/pagev';

export class FiltersC {
    filtersModel = new FiltersM;
    filtersView = new FiltersV;
    filtersHTML: Element;
    filters: Array<FiltersGroupObj>;

    constructor(){
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
        console.log(id, value);

        for(const group of this.filters){
            for(const filter of group.filters){
                if (filter.id === id){

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

        this.filtersModel.saveToLocalStorage(JSON.stringify(this.filters));

        new PageC;
    }

    resetFilters = () => {
        this.filtersModel.removeFromLocalStorage('filters');
        new PageC;
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
        console.log(filters, products);

        //let appliedFilters: Array<string>;

        let result = [];

        for(const group of filters){



            for(const filter of group.filters){
                switch(filter.filterType){

                    case 'checkbox':

                        if (filter.state ==='on') {
                            const key = filter.id.split('-')[0].toLowerCase();
                            const value = filter.id.split('-')[1].toLowerCase();

                            const filtered = products.filter(item => item.hasOwnProperty(key) && item[key] === value); // []
                            result.push(...filtered);
                        }

                        break;
                    case 'range': // todo
                        break;
                }


            }
        }

        return result;
    }

    getHTML(arrangedProducts: Array<ProductsObj>){
        const productsView = new ProductsV(arrangedProducts);
        return productsView.productsHTML;
    }

}


class PageC {
    filters = new FiltersC;
    products = new ProductsC;

    pageView = new PageV;

    constructor(){
        const filtersHTML = this.filters.filtersHTML;

        const arrangedProducts = this.products.arrangeProducts(this.filters.filters, this.products.products); // []
        const productsHTML = this.products.getHTML(arrangedProducts);

        this.pageView.renderWholePage(filtersHTML, productsHTML);
    }


}


new PageC;