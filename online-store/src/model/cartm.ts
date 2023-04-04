export class CartM {
    quantity;
    inCart;
    savedCartQuantity;
    constructor(){
        const savedCart = localStorage.getItem('app-cart');
        const savedCartQuantity = localStorage.getItem('app-cart-quantity');

        if(savedCart){
            this.inCart = JSON.parse(savedCart);
            this.quantity = this.inCart.length;
        } else {
            this.quantity = 0;
            this.inCart = [];
            localStorage.setItem('app-cart', JSON.stringify(this.inCart));
        }

        if(savedCartQuantity){
            this.savedCartQuantity = JSON.parse(savedCartQuantity)
        } else {
          this.savedCartQuantity = {};
          localStorage.setItem('app-cart-quantity', JSON.stringify(this.savedCartQuantity));
        }
    }

    addToCart(id: string) {
        const savedCart = localStorage.getItem('app-cart');
        const savedCartQuantity = localStorage.getItem('app-cart-quantity');
        if(savedCart){
            const cart = JSON.parse(savedCart);
            cart.push(id);
            localStorage.setItem('app-cart', JSON.stringify(cart));
        }
        if(savedCartQuantity){
          const cartq = JSON.parse(savedCartQuantity);
          cartq[id] = 1
          localStorage.setItem('app-cart-quantity', JSON.stringify(cartq));
        }
    }

    removeFromCart(id: string) {
        const savedCart = localStorage.getItem('app-cart');
        const savedCartQuantity = localStorage.getItem('app-cart-quantity');

        if(savedCart){
            const cart = JSON.parse(savedCart);
            const newCart = cart.filter((item: string) => item !== id);
            localStorage.setItem('app-cart', JSON.stringify(newCart));
        }
        if(savedCartQuantity){
            const cartq = JSON.parse(savedCartQuantity);
            delete cartq[id];
            localStorage.setItem('app-cart-quantity', JSON.stringify(cartq));
        }
    }
}