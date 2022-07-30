import { PageModel, SearchView, PageController } from '../types/types';

export class SearchC {
    searchHTML;
    searchView;
    pageController;
    pageModel;
    constructor(searchWord: string, pageModel: PageModel, searchView: SearchView, pageController: PageController) {
        this.pageModel = pageModel;
        this.pageController = pageController;
        this.searchView = searchView;
        this.searchView.renderSearch(searchWord);
        this.searchHTML = this.searchView.searchHTML;
        this.searchView.listenSearch(this.handleSearch);
    }

    handleSearch = (str: string): void => {
        this.pageModel.searchWord = str.toLowerCase();
        this.pageController.renderAppPage();
    };

    setFocus() {
        this.searchView.setFocus();
    }
}
