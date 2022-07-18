import { ProductsM } from '../model/productm';

import { ProductsV } from '../view/productsv';
import { FiltersGroupObj, ProductsObj } from '../types/types';


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