import { filtersConfig } from '../data/filters';

export class FiltersM {
    filters;
    constructor(){
        const savedFilters = localStorage.getItem('app-filters') as string;
        const copyOfFiltersConfig = JSON.stringify(filtersConfig);
        this.filters = JSON.parse(savedFilters) || JSON.parse(copyOfFiltersConfig);
    }

    saveToLocalStorage(){
        const data = JSON.stringify(this.filters);
        localStorage.setItem('app-filters', data);
    }

    removeFromLocalStorage(){
        const data = JSON.stringify(filtersConfig);
        localStorage.setItem('app-filters', data);
    }
}
