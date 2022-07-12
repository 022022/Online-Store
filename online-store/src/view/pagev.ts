export class PageV {

    header;

    constructor() {
        this.header = `
    <header>
        <h1>Smart Bands </h1>
        <div class="favorites">icon</div>
        <div class="controls">
            <button>Total Reset</button>
        </div>
    </header>`
    }


    renderWholePage(filtersHTML: Element, productsHTML: Element) {

        const header = document.createElement('header');
        header.innerHTML = this.header;

        const mainHTML = document.createElement('main');

        mainHTML.append(filtersHTML);
        mainHTML.append(productsHTML);

        const pageHTML = document.createElement('div');

        pageHTML.append(header);
        pageHTML.append(mainHTML);

        document.body.prepend(pageHTML);
    }

}

/*
<header>
    <h1>Smart Bands </h1>
    <div class="favorites">icon</div>
    <div class="controls">
        <button>Total Reset</button>
    </div>
</header>


<main class="main">

filters

products

</main>
*/
