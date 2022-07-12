import { FiltersGroupObj } from '../types/types';

export class FiltersV {
    filtersHTML;
    constructor(){
        this.filtersHTML = document.createElement('div');
    }

    render(filters: Array<FiltersGroupObj>){
        this.filtersHTML.classList.add('filters');
        //this.filtersHTML.setAttribute('id', 'filters');

        filters.forEach((item) => {
            const groupContainer = document.createElement('div');
            groupContainer.textContent = item.filtersGroupName;

            item.filters.forEach((field) => {
                const input = document.createElement('input');
                input.setAttribute('type', field.filterType);
                input.setAttribute('id', field.id);

                const attrKeys = Object.keys(field.filterAttrs);

                attrKeys.forEach((attr) => {
                    input.setAttribute(attr, field.filterAttrs[attr]);
                });

                groupContainer.append(input);

            })

            this.filtersHTML.appendChild(groupContainer);
          });


        this.filtersHTML.addEventListener('change', (event) => this.filtersHandlers(event))

        return this.filtersHTML;
        //document.body.prepend(this.filtersHTML);
    }

    filtersHandlers(event: Event) {
        console.log(event);



        //if (!event.target) throw new Error();
        //const changedInput = event.target as HTMLElement;

        // найти в фильтрах такой id
        //this.filtersHTML.forEach

        // rerender products
    }
}