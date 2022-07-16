import { FiltersGroupObj, CallbackHandleFilters, CallbackLocalStorage } from '../types/types';
import { FiltersC } from '../controller';

export class FiltersV {
    filtersHTML;
    resetButton;
    constructor(){
        this.filtersHTML = document.createElement('div');
        this.resetButton = document.createElement('button');
    }

    render(filters: Array<FiltersGroupObj>){
        this.filtersHTML.classList.add('filters');
        //this.filtersHTML.setAttribute('id', 'filters');


        filters.forEach((item) => {
            const groupContainer = document.createElement('div');
            groupContainer.setAttribute('class', 'filters__group');
            groupContainer.innerHTML = `<div class="group__name"> ${item.filtersGroupName} <div>` ;

            item.filters.forEach((field) => {
                const wrapper = document.createElement('div');

                switch(field.filterType){
                    case 'checkbox':
                        const input = document.createElement('input');
                        input.setAttribute('type', field.filterType);
                        input.setAttribute('id', field.id);

                        const label = document.createElement('label');
                        label.setAttribute('for', field.id);
                        label.innerHTML = field.id.split('-')[1];

                        const attrKeys = Object.keys(field.filterAttrs);
                        attrKeys.forEach((attr) => {
                            input.setAttribute(attr, field.filterAttrs[attr]);
                        });

                        if(field.state === 'on'){
                            input.setAttribute('checked', 'checked');
                        }

                        wrapper.append(input, label);
                        //wrapper.append(label);

                    break;

                    case 'range':

                        wrapper.setAttribute('class', 'slider-wrapper');
                        wrapper.setAttribute('id', `${field.id}`);

                        const inputFrom = document.createElement('input');
                        const inputTo = document.createElement('input');

                        inputFrom.setAttribute('id', `from-${field.id}`);
                        inputTo.setAttribute('id', `to-${field.id}`);
                        inputFrom.setAttribute('value', field.filterAttrs.valueFrom);
                        inputTo.setAttribute('value', field.filterAttrs.valueTo);

                        inputFrom.setAttribute('min', field.filterAttrs.min);
                        inputTo.setAttribute('min', field.filterAttrs.min);
                        inputFrom.setAttribute('max', field.filterAttrs.max);
                        inputTo.setAttribute('max', field.filterAttrs.max);
                        inputFrom.setAttribute('step', field.filterAttrs.step);
                        inputTo.setAttribute('step', field.filterAttrs.step);
                        inputFrom.setAttribute('class', 'range');
                        inputTo.setAttribute('class', 'range');
                        inputFrom.setAttribute('type', 'range');
                        inputTo.setAttribute('type', 'range');

                        this.fillSliderFromTo(inputFrom, inputTo);

                        wrapper.append(inputFrom, inputTo);


                    break;

                }


                groupContainer.append(wrapper);


            })

            this.filtersHTML.append(groupContainer);
          });


        this.resetButton.setAttribute('id', 'reset-filters');
        this.resetButton.setAttribute('class', 'button');
        this.resetButton.innerText = 'Reset';
        this.filtersHTML.append(this.resetButton);

        this.listenSliderToFillItQuickly();

        return this.filtersHTML;
        //document.body.prepend(this.filtersHTML);
    }

    fillSliderFromTo(inputFrom: HTMLInputElement, inputTo:HTMLInputElement) {

        console.log('fillinng');

        const min = Number(inputFrom.min);
        const max = Number(inputFrom.max);
        const fromValue = Number(inputFrom.value);
        const toValue = Number(inputTo.value);

        const range = max-min;
        const fromPosition = fromValue - min;
        const toPosition = toValue - min;

        inputFrom.style.background = `linear-gradient(
          to right,
          #eee 0%,
          #eee ${(fromPosition)/(range)*100}%,
          #000 ${((fromPosition)/(range))*100}%,
          #000 ${(toPosition)/(range)*100}%,
          #eee ${(toPosition)/(range)*100}%,
          #eee 100%)`;
    }


    listenSliderToFillItQuickly(){
        const sliderWrappers = this.filtersHTML.querySelectorAll('.slider-wrapper');
        sliderWrappers.forEach(wrapper =>
            wrapper.addEventListener('input', (event) => {
                const from = (wrapper.children[0] as HTMLInputElement);
                const to = (wrapper.children[1] as HTMLInputElement);
                this.fillSliderFromTo(from, to);
                }
            )
        )
    }


    listenFilters(handler: CallbackHandleFilters){
        this.filtersHTML.addEventListener('change', (event) => {

            if (!event.target) throw new Error();



            switch ((event.target as HTMLInputElement).type) {
                case 'checkbox':
                    const changedInputId = (event.target as HTMLInputElement).id;
                    const changedInputValue = (event.target as HTMLInputElement).value;
                    //console.log(changedInputId, changedInputValue);
                    handler(changedInputId, changedInputValue);

                break;

                case 'range':

                    const wrapper = (event.target as Element).closest('.slider-wrapper');

                    if(!wrapper) throw new Error();

                    const changedRangeGroupId = wrapper.id;

                    const from = (wrapper.children[0] as HTMLInputElement).value;
                    const to = (wrapper.children[1] as HTMLInputElement).value;

                    const changedRangeValues = `${from}-${to}`;

                    this.fillSliderFromTo((wrapper.children[0] as HTMLInputElement), (wrapper.children[1] as HTMLInputElement));

                    handler(changedRangeGroupId, changedRangeValues);               //

                break;
            }


            }
        )
    }


    listenResetFilters(handler: CallbackLocalStorage){
        this.resetButton.addEventListener('click', (event: Event) => {
                if (!event.target) throw new Error();
                handler();
            }
        )
    }


}