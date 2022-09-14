import { CallbackAddToCart } from '../types/types';

export class CartV {
    cartHTML: Element;
    warning;

    constructor(cartQuantity: number){
        this.cartHTML = document.createElement('div');
        this.cartHTML.setAttribute('class', 'cart');
        this.cartHTML.innerHTML = `${cartQuantity} items in Cart`;

        this.warning = document.createElement('div');
        this.warning.setAttribute('class', 'pop-up')
        this.warning.innerHTML = `Sorry, you have added maximum (20 products). Click to close`;

        this.cartHTML.append(this.warning);
    }

    listenAddToCart(handler: CallbackAddToCart) {
        const productsContainer = document.querySelector('.products');
        if(!productsContainer) throw new Error();

        productsContainer.addEventListener('click', (event: Event) => {
            if(!event.target) throw new Error;

            if((event.target as Element).tagName === "BUTTON"){
                const id = (event.target as Element).id;
                handler(id);
            }
        });
    }

    showModal(){
        this.warning.style.display = 'block';
        this.warning.style.animation = 'warning-on 0.5s';
        this.warning.addEventListener('click', (e) => this.warning.style.display = 'none');
    }
}