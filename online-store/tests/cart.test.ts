import { CartC } from '../src/controller/cartc';
import { fakeCartModel, fakeCartView, fakeApp } from './mocks/mocks';
import { CartM } from '../src/model/cartm';
import { CartV } from '../src/view/cartv';

beforeEach(() => {
    return localStorage.removeItem('app-cart');
});

afterEach(() => {
    return localStorage.removeItem('app-cart');
});


describe('when instantiated first time', () => {

    const cartModel = new CartM;

    const savedCart = localStorage.getItem('app-cart');
    let cart: string[];
    if(savedCart) cart = JSON.parse(savedCart);

    it('saves empty cart to class property and Local Storage', () => {
        expect(cartModel.inCart).toBeDefined();
        expect(cartModel.inCart).toHaveLength(0);

        expect(cart).toHaveLength(0);
    })
})


describe('when given id to add', () => {
    const cartModel = new CartM;
    const id = '19';

    cartModel.addToCart(id);

    const savedCart = localStorage.getItem('app-cart');
    let cart: string[];
    if(savedCart) cart = JSON.parse(savedCart);

    it('saves id to cart and Local Storage', () => {
        expect(cart).toContain(id);
    })
})


describe('when given id to remove', () => {
    const cartModel = new CartM;
    const id = '19';
    const test = ['19'];

    cartModel.addToCart(id);
    cartModel.removeFromCart(id);

    const savedCart = localStorage.getItem('app-cart');
    let cart: string[];
    if(savedCart) cart = JSON.parse(savedCart);

    it('removes id from cart and Local Storage', () => {
        expect(cart).toEqual(expect.not.arrayContaining(test));
    })
})


describe('when called', () => {
    const cartTest = new CartC(fakeCartModel, fakeCartView, fakeApp);
    cartTest.addCartListeners();

    it('should call view', () => {
        expect(fakeCartView.listenAddToCart).toHaveBeenCalled();
    });
});


describe('when given itemId', () => {
    const cartTest = new CartC(fakeCartModel, fakeCartView, fakeApp);
    cartTest.handleCart('add-777');

    test('if it calls respective model', () => {
        expect(fakeCartModel.addToCart).toHaveBeenCalledWith('777');
    });
});


describe('when called', () => {
    const cartView = new CartV;
    const cartQuantity = Math.ceil(Math.random() * 10);

    cartView.createCart(cartQuantity);

    const [cartStats] = cartView.cartHTML.getElementsByClassName('cart-stats');

    it('should create element with cart', () => {
        expect(cartStats).toBeDefined();
        expect(cartStats.innerHTML).toBe(`${cartQuantity} items in Cart`);
    });
});
