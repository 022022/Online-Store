import { ProductsObj } from '../types/types';

export class ProductsV {
    productsHTML;
    constructor(arrangedProducts: Array<ProductsObj>){
        this.productsHTML = document.createElement('div');
        this.render(arrangedProducts);
    }

    render(arrangedProducts: Array<ProductsObj>){
        this.productsHTML.classList.add('products');

        arrangedProducts.forEach( (product) => {
            const productCard = document.createElement('div');
            productCard.textContent = product.url;

            this.productsHTML.append(productCard);
        })

        //return this.productsHTML;
    }
}