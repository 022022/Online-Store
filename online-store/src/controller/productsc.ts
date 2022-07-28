import { ProductsM } from '../model/productm';

import { ProductsV } from '../view/productsv';
import { FiltersGroupObj, ProductsObj, SingleFilterObj } from '../types/types';

export class ProductsC {
    productsModel = new ProductsM();
    products: Array<ProductsObj>;

    constructor() {
        this.products = this.productsModel.products;
    }

    arrangeProducts(
        filters: Array<FiltersGroupObj>,
        products: Array<ProductsObj>,
        inCart: Array<string>,
        sortOrder: string,
        searchWord: string
    ) {
        const filtersGroupsOfConditions = [];

        const rangeFilters = [];

        for (const group of filters) {
            const conditionsGroup = [];
            for (const filter of group.filters) {
                switch (filter.filterType) {
                    case 'checkbox':
                        if (filter.state === 'on') {
                            const [key, value] = filter.id.split('-');
                            const obj = { [key.toLowerCase()]: value.toLowerCase() };
                            conditionsGroup.push(obj);
                        }
                        break;
                    case 'range':
                        rangeFilters.push([filter.id, filter.filterAttrs.valueFrom, filter.filterAttrs.valueTo]);

                        break;
                }
            }

            filtersGroupsOfConditions.push(conditionsGroup);
        }

        let productsFilteredByCheckboxes = products;

        for (const conditionsGroup of filtersGroupsOfConditions) {
            if (conditionsGroup.length === 0) continue;

            const filteredProductsByGroup = productsFilteredByCheckboxes.filter((product) => {
                for (const condition of conditionsGroup) {
                    if (product[Object.keys(condition)[0]] === Object.values(condition)[0]) {
                        return true;
                    }
                }
            });
            productsFilteredByCheckboxes = filteredProductsByGroup;
        }

        let productsFilteredByRanges = productsFilteredByCheckboxes;

        for (const rangeFilter of rangeFilters) {
            const productsTemp = productsFilteredByRanges.filter((product) => {
                const [id, from, to] = rangeFilter;
                if (id) {
                    const value = Number(product[id]);
                    if (value >= Number(from) && value <= Number(to)) return true;
                    }
            });
            productsFilteredByRanges = productsTemp;
        }

        productsFilteredByRanges.forEach((product) => {
            if (inCart.includes(product.id)) {
                product.incart = 'yes';
            } else {
                product.incart = 'no';
            }
        });

        if (searchWord) {
            const productsFilteredBySearch = productsFilteredByRanges.filter((product) =>
                product.name.toLowerCase().includes(searchWord)
            );
            productsFilteredByRanges = productsFilteredBySearch;
        }

        switch (sortOrder) {
            case 'name-a':
                productsFilteredByRanges.sort((a, b): number => {
                    if (a.name < b.name) return -1;
                    if (a.name > b.name) return 1;
                    return 0;
                });
                break;

            case 'name-z':
                productsFilteredByRanges.sort((a, b): number => {
                    if (b.name < a.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
                break;

            case 'released-new':
                productsFilteredByRanges.sort((a, b): number => {
                    return Number(b.released) - Number(a.released);
                });
                break;

            case 'released-old':
                productsFilteredByRanges.sort((a, b): number => {
                    return Number(a.released) - Number(b.released);
                });
                break;
        }

        return productsFilteredByRanges;
    }

    getHTML(arrangedProducts: Array<ProductsObj>) {
        const productsView = new ProductsV(arrangedProducts);
        return productsView.productsHTML;
    }
}
