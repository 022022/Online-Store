

export class PageV {

    footer;
    appName;

    constructor() {

        this.appName = 'Smart Bands Store';

        this.footer =  `

        <div class="copyright">2022</div>
            <a href="https://rs.school/js/"> <div class="logo"></div></a>
            <a href="https://github.com/022022">My GitHub</a>

    `

    }


    renderWholePage(filtersHTML: Element, productsHTML: Element, cartHTML: Element) {

        (document.querySelector('body') as Element).innerHTML = '';

        const header = document.createElement('header');
        header.innerHTML = `<h1> ${this.appName} </h1>`;
        header.append(cartHTML);

       // const popUp = document.createElement('div');
        //popUp.setAttribute('class', 'pop-up')
       // popUp.innerHTML = `Sorry, you have added maximum (20 products)`;

       // header.append(popUp);

        //header.append()

         //   <div class="controls">
         //       <button class="button">Total Reset</button>
         //   </div>


        const footer = document.createElement('footer');
        footer.innerHTML = this.footer;



        const mainHTML = document.createElement('main');

        mainHTML.append(filtersHTML, productsHTML);
        //mainHTML.append(filtersHTML);
        //mainHTML.append(productsHTML);



        document.body.append(header, mainHTML, footer);

    }



}
