import { FiltersGroupObj, CallbackHandleFilters, CallbackLocalStorage } from '../types/types';

export class FiltersV {
    filtersHTML;
    resetButton;
    filtersControls;
    constructor(){
        this.filtersHTML = document.createElement('div');
        this.filtersControls = document.createElement('div');
        this.resetButton = document.createElement('button');
    }

    render(filters: Array<FiltersGroupObj>){

        this.filtersHTML.classList.add('filters');
        this.filtersControls.classList.add('filters__controls');

        filters.forEach((item) => {
            const groupContainer = document.createElement('div');
            groupContainer.setAttribute('class', 'filters__group');
            groupContainer.innerHTML = `<div class="group__name"> ${item.filtersGroupName} </div>` ;

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


                    break;

                    case 'range':

                        groupContainer.innerHTML = `
                            <div class="group__name"> ${item.filtersGroupName}:
                                <span class="accented-text">${field.filterAttrs.valueFrom} - ${field.filterAttrs.valueTo}</span>
                            </div>`;

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

            this.filtersControls.append(groupContainer);
          });


        this.filtersHTML.append(this.filtersControls);

        this.resetButton.setAttribute('id', 'reset-filters');
        this.resetButton.setAttribute('class', 'button');
        this.resetButton.innerText = 'Reset Filters';
        this.filtersHTML.append(this.resetButton);

        this.listenSliderToDrawMove();

        return this.filtersHTML;

    }

    fillSliderFromTo(inputFrom: HTMLInputElement, inputTo:HTMLInputElement) {

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


    listenSliderToDrawMove(){
        const sliderWrappers = this.filtersHTML.querySelectorAll('.slider-wrapper');
        sliderWrappers.forEach(wrapper =>
            wrapper.addEventListener('input', (event) => {
                const from = (wrapper.children[0] as HTMLInputElement);
                const to = (wrapper.children[1] as HTMLInputElement);

                if (Number(from.value) > Number(to.value)){
                    from.value = to.value;
                }

                this.fillSliderFromTo(from, to);
                }
            )
        )
    }


    listenFilters(handler: CallbackHandleFilters){
        this.filtersControls.addEventListener('change', (event) => {

            if (!event.target) throw new Error();



            switch ((event.target as HTMLInputElement).type) {
                case 'checkbox':
                    const changedInputId = (event.target as HTMLInputElement).id;
                    const changedInputValue = (event.target as HTMLInputElement).value;
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