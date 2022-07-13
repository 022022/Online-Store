import { FiltersM } from './model';
import { FiltersV } from './view/filtersv';
import { FiltersGroupObj } from './types/types';
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

        ////////////////////////////////////////
        console.log(this.filters);

        this.filtersModel.saveToLocalStorage(JSON.stringify(this.filters));

        new PageC;
    }

}


class PageC {
    filters = new FiltersC;

    pageView = new PageV;

    constructor(){
        const filtersHTML = this.filters.filtersHTML;
        const productsHTML = document.createElement('div');
        this.pageView.renderWholePage(filtersHTML, productsHTML);
    }


}


new PageC;