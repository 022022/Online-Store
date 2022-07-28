import { CartV } from '../view/cartv';
import { CartM } from '../model/cartm';
import { app } from '../app';
import { CARTMAXIMUM } from '../constants';

export class CartC {
    cartHTML: Element;
    cartView;
    cartModel;
    cartQuantity;
    inCart;

    constructor() {
        this.cartModel = new CartM();
        this.cartQuantity = this.cartModel.quantity;
        this.inCart = this.cartModel.inCart;
        this.cartView = new CartV(this.cartQuantity);
        this.cartHTML = this.cartView.cartHTML;
    }

    handleCart = (itemId: string): void => {
        const [ action, id ] = itemId.split('-');

        if (action === 'add') {
            if (this.cartQuantity < CARTMAXIMUM) {
                this.cartModel.addToCart(id);
                app.renderAppPage();
            } else {
                this.cartView.showModal();
            }
        }

        if (action === 'remove') {
            this.cartModel.removeFromCart(id);
            app.renderAppPage();
        }
    };

    addCartListeners() {
        this.cartView.listenAddToCart(this.handleCart);
    }
}
