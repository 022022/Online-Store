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

            productCard.classList.add('product');

            const productHeader = document.createElement('div');
            productHeader.setAttribute('class', 'product__header');
            productHeader.innerHTML =
            `
                <img src="./images/${product.url}.jpg" class="product__image">
                <div>
                    <div class="product__name"> ${product.name} </div>

                    <div > <span class="product__property">Band Material</span> ${product.bandmaterial} </div>
                    <div > <span class="product__property">Brand</span> ${product.brand} </div>
                    <div > <span class="product__property">Color</span> ${product.color} </div>

                    <div > <span class="product__property">Released</span> ${product.released} </div>
                </div>
            `

            const productFooter = document.createElement('div');
            productFooter.setAttribute('class', 'product__footer');

            if(product.incart === 'no') {
                productCard.classList.remove('incart');
                productFooter.innerHTML =
                `
                    <div> ${product.instock} in stock </div>
                    <button class="button" id="add-${product.id}">Add to Cart</button>
                `
            }

            if(product.incart === 'yes') {
                productCard.classList.add('incart');
                productFooter.innerHTML =
                `
                    <div> ${product.instock} in stock </div>
                    <button class="secondary-button" id="remove-${product.id}">Remove from cart</button>
                `
            }

            productCard.append(productHeader, productFooter);

            this.productsHTML.append(productCard);
        })

        //return this.productsHTML;
    }
}