

export class PageV {

    header;
    footer;

    constructor() {
        this.header = `

        <h1>Smart Bands Store</h1>
        <div class="favorites">0 items in Favorites</div>
        <div class="controls">
            <button class="button">Total Reset</button>
        </div>
    `
        this.footer =  `

        <div class="copyright">2022</div>
            <a href="https://rs.school/js/"> <div class="logo"></div></a>
            <a href="https://github.com/022022">My GitHub</a>

    `

    }


    renderWholePage(filtersHTML: Element, productsHTML: Element) {

        (document.querySelector('body') as Element).innerHTML = '';

        const header = document.createElement('header');
        header.innerHTML = this.header;
        const footer = document.createElement('footer');
        footer.innerHTML = this.footer;

        const mainHTML = document.createElement('main');

        mainHTML.append(filtersHTML);
        mainHTML.append(productsHTML);

        document.body.append(header, mainHTML, footer);
    }



}
