import { FiltersM } from './model';
import { FiltersV } from './view/filtersv';
import { FiltersGroupObj } from './types/types';
import { PageV } from './view/pagev';

class FiltersC {
    filtersModel = new FiltersM;
    filtersView = new FiltersV;
    filtersHTML: Element;

    constructor(){
        const filters = this.arrangeFilters(this.filtersModel.filters); // do smth in controller
        this.filtersHTML = this.filtersView.render(filters); // render html in view
    }

    arrangeFilters(filters: Array<FiltersGroupObj>){
        //this.filtersView.render(filters);
        return filters;
    }
}


class PageC {
    filters = new FiltersC;

    page = new PageV;

    constructor(){
        const filtersHTML = this.filters.filtersHTML;

        const productsHTML = document.createElement('div');
        this.page.renderWholePage(filtersHTML, productsHTML);
    }
}


new PageC;