import { CallbackLocalStorage } from '../types/types';

export class PageV {
    footer;
    appName;
    totalResetButton;

    constructor() {
        this.appName = 'Smart Bands Store';

        this.totalResetButton = document.createElement('button');
        this.totalResetButton.setAttribute('class', 'button');
        this.totalResetButton.setAttribute('id', 'total-reset');
        this.totalResetButton.innerText = 'Total Reset';

        this.footer = `

        <div class="copyright">2022</div>
            <a href="https://rs.school/js/"> <div class="logo"></div></a>
            <a href="https://github.com/022022">My GitHub</a>

    `;
    }

    renderWholePage(
        filtersHTML: Element,
        productsHTML: Element,
        cartHTML: Element,
        searchHTML: Element,
        sortHTML: Element,
        cartPanelBtn: Element
    ) {
        (document.querySelector('body') as Element).innerHTML = '';

        const header = document.createElement('header');
        header.innerHTML = `<h1> ${this.appName} </h1>`;
        header.append(cartHTML);
        header.append(cartPanelBtn);


        const footer = document.createElement('footer');
        footer.innerHTML = this.footer;

        const actions = document.createElement('div');
        actions.setAttribute('class', 'actions');
        actions.append(searchHTML);
        actions.append(sortHTML);
        actions.append(this.totalResetButton);

        const main = document.createElement('main');
        main.append(filtersHTML, actions, productsHTML);
        document.body.append(header, main, footer);
    }

    listenTotalReset(handler: CallbackLocalStorage) {
        this.totalResetButton.addEventListener('click', () => handler());
    }
}
