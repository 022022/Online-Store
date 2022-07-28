import { FiltersM } from '../model/filterm';
import { FiltersV } from '../view/filtersv';
import { FiltersGroupObj } from '../types/types';
import { app } from '../app';
import { ON, OFF } from '../constants';

export class FiltersC {
    filtersModel;
    filtersView;
    filtersHTML: Element;
    filters: Array<FiltersGroupObj>;

    constructor() {
        this.filtersModel = new FiltersM();
        this.filtersView = new FiltersV();

        this.filters = this.filtersModel.filters;
        this.filtersHTML = this.filtersView.render(this.filters);

        this.filtersView.listenFilters(this.handleFilters);
        this.filtersView.listenResetFilters(this.resetFilters);
    }

    handleFilters = (id: string, value: string): void => {
        for (const group of this.filters) {
            for (const filter of group.filters) {
                if (filter.id === id) {
                    switch (filter.filterType) {
                        case 'checkbox':
                            switch (filter.state) {
                                case 'off':
                                    filter.state = ON;
                                    break;
                                case 'on':
                                    filter.state = OFF;
                                    break;
                                default:
                                    filter.state = value;
                            }
                        break;
                        case 'range':
                            [filter.filterAttrs.valueFrom, filter.filterAttrs.valueTo] = value.split('-');
                            break;
                    }
                }
            }
        }

        this.filtersModel.filters = this.filters;
        this.filtersModel.saveToLocalStorage();

        app.renderAppPage();
    };

    resetFilters = () => {
        this.filtersModel.removeFromLocalStorage();
        app.renderAppPage();
    };
}
