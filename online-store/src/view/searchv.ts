import { CallbackSearch } from '../types/types';

export class SearchV {
    searchHTML;
    constructor(){
        this.searchHTML = document.createElement('div');
        this.searchHTML.innerHTML = `<input class="search"
            autofocus
            type="search"
            autocomplete='off'
            placeholder="Search for ...">
            <div id="search-message" class="search-message">
            </div>
            `
    }

    listenSearch(handler: CallbackSearch) {
        this.searchHTML.addEventListener('input', (event) => {
            if (!event.target) throw new Error;
            const searchWord = (event.target as HTMLInputElement).value;
            handler(searchWord);
        });
    }
}