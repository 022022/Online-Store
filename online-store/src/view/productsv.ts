import { ProductsObj } from '../types/types';

export class ProductsV {
    productsHTML;
    constructor(arrangedProducts: Array<ProductsObj>){
        this.productsHTML = document.createElement('div');
        this.render(arrangedProducts);
    }

    render(arrangedProducts: Array<ProductsObj>){
        this.productsHTML.classList.add('products');

        if(arrangedProducts.length === 0) {
            this.productsHTML.innerHTML = 'Sorry, but nothing matched your search or filter criteria. Please try again'
        }

        arrangedProducts.forEach( (product) => {
            const productCard = document.createElement('div');
            //productCard.textContent = product.url;

            productCard.innerHTML =
            `
            <div class="product">


            <div class="product__header">
                <img src="./images/${product.url}.jpg" class="product__image">
                <div>
                    <div class="product__name"> ${product.name} </div>

                    <div > <span class="product__property">Band Material</span> ${product.bandmaterial} </div>
                    <div > <span class="product__property">Brand</span> ${product.brand} </div>
                    <div > <span class="product__property">Color</span> ${product.color} </div>

                    <div > <span class="product__property">Released</span> ${product.released} </div>
                </div>
            </div>
            <div class="product__footer">
                <div>
                ${product.instock} in stock

                </div>

                <button class="button">Add to Cart</button>
            </div>

            </div>
            `



            this.productsHTML.append(productCard);
        })

        //return this.productsHTML;
    }
}