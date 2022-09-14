export class SortM {
    sortOrder;
    defaultSorting = 'name-a';
    constructor(){
        if(localStorage.getItem('app-sort')){
            const savedSorting = localStorage.getItem('app-sort') as string;
            this.sortOrder = JSON.parse(savedSorting);
        } else {
            this.sortOrder = this.defaultSorting;
            localStorage.setItem('app-sort', JSON.stringify(this.sortOrder));
        }
    }

    update(sorting: string){
        localStorage.setItem('app-sort', JSON.stringify(sorting));
    }
}