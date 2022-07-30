import { SortModel, SortView, PageController } from '../types/types';

export class SortC {
    sortView;
    sortModel;
    sortHTML;
    sortOrder;
    pageController;
    constructor(sortModel: SortModel, sortView: SortView, pageController: PageController) {
        this.sortModel = sortModel;
        this.sortOrder = this.sortModel.sortOrder;

        this.sortView = sortView;
        this.sortView.renderSorting(this.sortOrder);

        this.sortHTML = this.sortView.sortHTML;
        this.sortView.listenSort(this.handleSort);

        this.pageController = pageController;
    }

    handleSort = (sorting: string): void => {
        this.sortModel.update(sorting);
        this.pageController.renderAppPage();
    };
}
