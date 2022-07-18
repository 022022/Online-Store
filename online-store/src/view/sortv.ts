import { CallbackSort } from '../types/types';

       //
    //    <select>
    //        <option value="0">Sort By</option>
    //        <option value="name-a">Name (A-Z)</option>
    //        <option value="name-z">Name (Z-A)</option>
     //       <option value="released-new">Year Released (newest)</option>
     //       <option value="released-old">Year Released (oldest)</option>
    //    <select>

export class SortV {
    sortHTML;
    options = [
        {value: 'name-a', text: 'Name (A-Z)'},
        {value: 'name-z', text: 'Name (Z-A)'},
        {value: 'released-new', text: 'Year Released (newest first)'},
        {value: 'released-old', text: 'Year Released (oldest first)'},
    ]

    constructor(sorting: string){
        this.sortHTML = document.createElement('div');
        const sortField = document.createElement('select');
        sortField.setAttribute('class', 'sort');

        for(const opt of this.options){
            const option = document.createElement("option");
            option.setAttribute('value', opt.value);
            option.innerText = opt.text;
            if(option.value === sorting){
                option.setAttribute('selected', 'true');
            }

            sortField.append(option);
        }

        this.sortHTML.append(sortField);
    }


    listenSort(handler: CallbackSort){
        this.sortHTML.addEventListener('change', (event) => {
            if (!event.target) throw new Error;
            const sorting = (event.target as HTMLInputElement).value;

            console.log((event.target as HTMLInputElement).value);

            handler(sorting);
        });
    }
}