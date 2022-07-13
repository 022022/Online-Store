import { filtersConfig } from './filters';
import { FiltersGroupObj } from './types/types';

export class FiltersM {
    filters;
    constructor(){
        const filters = localStorage.getItem('filters');

        if (!filters) throw new Error();

        this.filters = JSON.parse(filters) || filtersConfig;
    }

    saveToLocalStorage(data: string){
        localStorage.setItem('filters', data);
    }

    removeFromLocalStorage(name: string){
        localStorage.removeItem(name);
    }
}