export class SortM {
    sortOrder;
    defaultSorting = 'name-a';
    constructor() {
        const savedSorting = localStorage.getItem('app-sort');
        if (savedSorting) {
            this.sortOrder = JSON.parse(savedSorting);
        } else {
            this.sortOrder = this.defaultSorting;
            localStorage.setItem('app-sort', JSON.stringify(this.sortOrder));
        }
    }

    update(sorting: string) {
        localStorage.setItem('app-sort', JSON.stringify(sorting));
    }
}
