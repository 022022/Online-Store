import { CartV } from '../view/cartv';
import { CartM } from '../model/cartm';
import { app } from '../app';


export class CartC {
    cartHTML: Element;
    cartView;
    cartModel;
    cartQuantity;
    inCart;

    constructor(){
        this.cartModel = new CartM;
        this.cartQuantity = this.cartModel.quantity;
        this.inCart = this.cartModel.inCart;
        this.cartView = new CartV(this.cartQuantity);
        this.cartHTML = this.cartView.cartHTML;
    }


    handleCart = (itemId: string): void => {

        const action = itemId.split('-')[0];
        const id = itemId.split('-')[1];

        if(action === 'add'){
            if (this.cartQuantity < 20){
                this.cartModel.addToCart(id);
                app.renderAppPage();
            } else {
                this.cartView.showModal();
            }
        }

        if(action === 'remove'){
            this.cartModel.removeFromCart(id);
            app.renderAppPage();
        }
    }

    addCartListeners(){
        this.cartView.listenAddToCart(this.handleCart);
    }
}