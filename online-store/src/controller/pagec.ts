import { PageV } from '../view/pagev';
import { CartC } from '../controller/cartc';
import { SearchC } from '../controller/searchc';
import { SortC } from '../controller/sortc';
import { FiltersC } from '../controller/filterc';
import { ProductsC } from '../controller/productsc';

import { PageM } from '../model/pagem';

export class PageC {
    pageModel;
    coordY = 0;

    constructor(){
        this.pageModel = new PageM;
        this.renderAppPage();
    }

    renderAppPage(){

        this.saveScroll();

        const filters = new FiltersC;
        const products = new ProductsC;
        const cart = new CartC;
        const sort = new SortC;

        const search = new SearchC(this.pageModel.searchWord);
        const searchHTML = search.searchHTML;

        const filtersHTML = filters.filtersHTML;
        const cartHTML = cart.cartHTML;
        const sortHTML = sort.sortHTML;


        const arrangedProducts = products.arrangeProducts(filters.filters,
                                            products.products, cart.inCart, sort.sortOrder, this.pageModel.searchWord);

        const productsHTML = products.getHTML(arrangedProducts);

        //console.log(this.filters.filters, this.products.products);

        const pageView = new PageV;
        pageView.renderWholePage(filtersHTML, productsHTML, cartHTML, searchHTML, sortHTML);

        cart.addCartListeners();

        search.setFocus();

        pageView.listenTotalReset(this.totalPageReset);

        this.getScroll();
    }

    totalPageReset = ():void => {
        this.pageModel.totalReset();
    }

    saveScroll(){
        this.coordY = window.scrollY;
    }

    getScroll(){
        window.scroll(0, this.coordY);
    }
}
