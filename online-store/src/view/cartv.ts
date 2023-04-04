import { CallbackAddToCart } from '../types/types';
import { CARTMAXIMUM } from '../constants';

export class CartV {
    cartHTML: Element;
    warning;

    constructor() {
        this.cartHTML = document.createElement('div');
        this.warning = document.createElement('div');
    }

    createCart(cartQuantity: number){

        this.cartHTML.setAttribute('class', 'cart');
        const cartStats = document.createElement('div');
        cartStats.setAttribute('class', 'cart-stats');
        cartStats.innerHTML = `${cartQuantity}`;

        this.warning.setAttribute('class', 'pop-up');
        this.warning.innerHTML = `Sorry, you have added maximum (${CARTMAXIMUM} products). Click to close`;

        this.cartHTML.append(cartStats);
        this.cartHTML.append(this.warning);
    }

    listenAddToCart(handler: CallbackAddToCart) {
        const productsContainer = document.querySelector('.products');
        if (productsContainer){
            productsContainer.addEventListener('click', (event: Event) => {

                if ((event.target as Element).tagName === 'BUTTON') {
                    const id = (event.target as Element).id;
                    handler(id);
                }
            });
        }
    }

    showModal() {
        this.warning.style.display = 'block';
        this.warning.style.animation = 'warning-on 0.5s';
        this.warning.addEventListener('click', () => (this.warning.style.display = 'none'));
    }
}
