import { CARTMAXIMUM } from '../constants';
import { CartModel, CartView, App } from '../types/types';

export class CartC {
    cartHTML;
    cartView;
    cartModel;
    cartQuantity;
    inCart;
    app;

    constructor(cartModel: CartModel, cartView: CartView, app: App) {
        this.cartModel = cartModel;
        this.cartQuantity = this.cartModel.quantity;
        this.inCart = this.cartModel.inCart;
        this.cartView = cartView;
        this.cartHTML = this.cartView.cartHTML;
        this.cartView.createCart(this.cartQuantity);
        this.app = app;
    }

    handleCart = (itemId: string): void => {
        const [ action, id ] = itemId.split('-');

        if (action === 'add') {
            if (this.cartQuantity < CARTMAXIMUM) {
                this.cartModel.addToCart(id);
                this.newRender();
            } else {
                this.cartView.showModal();
            }
        }

        if (action === 'remove') {
            this.cartModel.removeFromCart(id);
            this.newRender();
        }
    };

    addCartListeners() {
        this.cartView.listenAddToCart(this.handleCart);
    }

    newRender(){
        this.app();
    }
}
