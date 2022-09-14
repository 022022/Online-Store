
export class CartM {
    quantity;
    inCart;
    constructor(){
        if(localStorage.getItem('app-cart')){
            const savedCart = localStorage.getItem('app-cart') as string;
            this.inCart = JSON.parse(savedCart);
            this.quantity = this.inCart.length;

        } else {
            this.quantity = 0;
            this.inCart = [];
            localStorage.setItem('app-cart', JSON.stringify(this.inCart));
        }
    }

    addToCart(id: string) {  // saves to local storage
        let cart = JSON.parse(localStorage.getItem('app-cart') as string);
        cart.push(id);
        localStorage.setItem('app-cart', JSON.stringify(cart));
    }

    removeFromCart(id: string) {
        const cart = JSON.parse(localStorage.getItem('app-cart') as string);
        const newCart = cart.filter((item: string) => item !== id);
        localStorage.setItem('app-cart', JSON.stringify(newCart));
    }

}