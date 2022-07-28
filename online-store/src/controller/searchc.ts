import { SearchV } from '../view/searchv';
import { app } from '../app';

export class SearchC {
    searchHTML;
    searchView;
    constructor(searchWord: string) {
        this.searchView = new SearchV(searchWord);
        this.searchHTML = this.searchView.searchHTML;
        this.searchView.listenSearch(this.handleSearch);
    }

    handleSearch = (str: string): void => {
        app.pageModel.searchWord = str.toLowerCase();
        app.renderAppPage();
    };

    setFocus() {
        this.searchView.setFocus();
    }
}
