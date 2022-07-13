import { FiltersGroupObj, Callback, CallbackLocalStorage } from '../types/types';
import { FiltersC } from '../controller';

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

                if(field.filterType === 'checkbox' && field.state === 'on'){
                    input.setAttribute('checked', 'checked');
                }

                if(field.filterType === 'range' && field.state){
                    input.setAttribute('value', field.state);
                }

                groupContainer.append(input);

            })

            this.filtersHTML.append(groupContainer);
          });

        const resetButton = document.createElement('button');
        resetButton.setAttribute('id', 'reset-filters');
        resetButton.innerText = 'Reset';
        this.filtersHTML.append(resetButton);

        return this.filtersHTML;
        //document.body.prepend(this.filtersHTML);
    }


    listenFilters(handler: Callback){
        this.filtersHTML.addEventListener('change', (event) => {

            if (!event.target) throw new Error();

            const changedInputId = (event.target as HTMLInputElement).id;
            const changedInputValue = (event.target as HTMLInputElement).value;

            handler(changedInputId, changedInputValue);
            }
        )
    }

    listenResetFilters(handler: CallbackLocalStorage){
        this.filtersHTML.addEventListener('click', (event) => {
                if (!event.target) throw new Error();
                if ((event.target as HTMLInputElement).id === 'reset-filters'){
                    handler();
                }
            }
        )
    }

}