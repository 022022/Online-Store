import { FiltersM } from '../model/filterm';
import { FiltersV } from '../view/filtersv';
import { FiltersGroupObj } from '../types/types';
import { app } from '../app';


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
