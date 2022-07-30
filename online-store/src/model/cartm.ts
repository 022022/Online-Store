export class CartM {
    quantity;
    inCart;
    constructor(){
        const savedCart = localStorage.getItem('app-cart');
        if(savedCart){
            this.inCart = JSON.parse(savedCart);
            this.quantity = this.inCart.length;

        } else {
            this.quantity = 0;
            this.inCart = [];
            localStorage.setItem('app-cart', JSON.stringify(this.inCart));
        }
    }

    addToCart(id: string) {
        const savedCart = localStorage.getItem('app-cart');
        if(savedCart){
            const cart = JSON.parse(savedCart);
            cart.push(id);
            localStorage.setItem('app-cart', JSON.stringify(cart));
        }
    }

    removeFromCart(id: string) {
        const savedCart = localStorage.getItem('app-cart');
        if(savedCart){
            const cart = JSON.parse(savedCart);
            const newCart = cart.filter((item: string) => item !== id);
            localStorage.setItem('app-cart', JSON.stringify(newCart));
        }
    }
}