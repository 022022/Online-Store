import { PageV } from '../view/pagev';
import { CartC } from '../controller/cartc';
import { SearchC } from '../controller/searchc';
import { SortC } from '../controller/sortc';
import { FiltersC } from '../controller/filterc';
import { ProductsC } from '../controller/productsc';
import { CartV } from '../view/cartv';
import { CartM } from '../model/cartm';
import { FiltersM } from '../model/filterm';
import { FiltersV } from '../view/filtersv';
import { ProductsM } from '../model/productm';
import { ProductsV } from '../view/productsv';
import { SortV } from '../view/sortv';
import { SortM } from '../model/sortm';
import { app } from '../app';
import { PageM } from '../model/pagem';
import { SearchV } from '../view/searchv';


export class PageC {
    pageModel;
    coordY = 0;

    constructor() {
        this.pageModel = new PageM();
        this.renderAppPage();
    }

    renderAppPage() {
        this.saveScroll();

        const filters = new FiltersC(new FiltersM(), new FiltersV(), app);
        const products = new ProductsC(new ProductsM(), new ProductsV());
        const cart = new CartC(new CartM(), new CartV(), app);
        const sort = new SortC(new SortM, new SortV, this);

        const search = new SearchC(this.pageModel.searchWord, this.pageModel, new SearchV, this);

        const searchHTML = search.searchHTML;

        const filtersHTML = filters.filtersHTML;
        const cartHTML = cart.cartHTML;
        const sortHTML = sort.sortHTML;

        const arrangedProducts = products.arrangeProducts(
            filters.filters,
            products.products,
            cart.inCart,
            sort.sortOrder,
            this.pageModel.searchWord
        );

        const productsHTML = products.getHTML(arrangedProducts);

        const pageView = new PageV();
        pageView.renderWholePage(filtersHTML, productsHTML, cartHTML, searchHTML, sortHTML);
        cart.addCartListeners();
        search.setFocus();
        pageView.listenTotalReset(this.totalPageReset);
        this.getScroll();
    }

    totalPageReset = (): void => {
        this.pageModel.totalReset();
    };

    saveScroll() {
        this.coordY = window.scrollY;
    }

    getScroll() {
        window.scroll(0, this.coordY);
    }


}
