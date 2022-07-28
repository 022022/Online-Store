export class PageM {
    searchWord;
    constructor() {
        this.searchWord = '';
    }

    totalReset() {
        localStorage.clear();
        location.reload();
    }
}
