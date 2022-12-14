import { CallbackSearch } from '../types/types';

export class SearchV {
    searchHTML;
    searchField;
    constructor(searchWord: string){
        this.searchHTML = document.createElement('div');
        this.searchField = document.createElement('input');

        if(searchWord){
            this.searchField.value = searchWord;
        }

        this.searchField.setAttribute('autofocus', 'autofocus');
        this.searchField.setAttribute('type', 'search');
        this.searchField.setAttribute('autocomplete', 'off');
        this.searchField.setAttribute('placeholder', 'Search for ...');
        this.searchField.setAttribute('class', 'search');

        this.searchHTML.append(this.searchField);

    }

    listenSearch(handler: CallbackSearch) {
        this.searchHTML.addEventListener('input', (event) => {
            if (!event.target) throw new Error;
            const searchWord = (event.target as HTMLInputElement).value;
            handler(searchWord);
        });
    }

    setFocus(){
        this.searchField.focus();
    }
}