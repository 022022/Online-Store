
import { SortV } from '../view/sortv';
import { app } from '../app';
import { SortM } from '../model/sortm'

export class SortC {
    sortView;
    sortModel;
    sortHTML;
    sortOrder;
    constructor() {
        this.sortModel = new SortM;
        this.sortOrder = this.sortModel.sortOrder;

        this.sortView = new SortV(this.sortOrder);
        this.sortHTML = this.sortView.sortHTML;
        this.sortView.listenSort(this.handleSort);
    }

    handleSort = (sorting: string): void => {
        this.sortModel.update(sorting);
        app.renderAppPage();
    }
}