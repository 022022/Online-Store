import { FiltersGroupObj, FiltersModel, FiltersView, App } from '../types/types';
import { STATE } from '../constants'

export class FiltersC {
    filtersModel;
    filtersView;
    filtersHTML: Element;
    filters: Array<FiltersGroupObj>;
    app;

    constructor(filtersModel: FiltersModel, filtersView: FiltersView, app: App) {
        this.filtersModel = filtersModel;
        this.filtersView = filtersView;
        this.app = app;

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
                                    filter.state = STATE.on;
                                    break;
                                case 'on':
                                    filter.state = STATE.off;
                                    break;
                                default:
                                    filter.state = STATE.off;
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

        this.newRender();
    };

    resetFilters = () => {
        this.filtersModel.removeFromLocalStorage();
        this.newRender();
    };

    newRender(){
        this.app();
    }
}
