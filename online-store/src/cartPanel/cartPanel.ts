import { productsConfig } from '../data/products';
import { App, ProductsObj } from '../types/types';
import { makeElements } from './makeElement';

export class CartPanel {
  cartPanelBtn;
  cartPanelHTML;
  cartPanelOverlay;
  inCartQuantity: { [index: string] : number};
  inCart: string[];
  toBeRemoved: string[];
  app: App;

  constructor (app: App) {
    this.app = app;

    this.cartPanelBtn = makeElements('button', {classes: 'button cart-panel__open', text: 'Open Cart'})
    this.cartPanelBtn.addEventListener('click', this.openCartPanel);

    const savedCart = localStorage.getItem('app-cart');
    if(savedCart){
        this.inCart = JSON.parse(savedCart);
    } else {
        this.inCart = [];
        localStorage.setItem('app-cart', JSON.stringify(this.inCart));
    }
    this.toBeRemoved = [];

    this.inCartQuantity = {};
    this.cartPanelOverlay = makeElements('div', {});
    this.cartPanelHTML = makeElements('div', {});
  }

  openCartPanel = () => {
    this.cartPanelOverlay = makeElements('div', {classes: 'cart-panel__overlay'});
    this.cartPanelHTML = makeElements('div', {classes: 'cart-panel__content'});

    this.setUpCartPanel();

    this.cartPanelOverlay.append(this.cartPanelHTML);
    document.body.append(this.cartPanelOverlay);
    this.cartPanelBtn.removeEventListener('click', this.openCartPanel);

    document.body.style.overflow = 'hidden';
  }

  closeCartPanel = () => {
    const currentPanel = document.querySelector('.cart-panel__overlay');
    currentPanel?.classList.add('cart-panel__close');
    document.body.style.overflow = 'auto';

    const filtered = this.inCart.filter((item) => !this.toBeRemoved.includes(item));
    localStorage.setItem('app-cart', JSON.stringify(filtered));

    currentPanel?.addEventListener('animationend', () => this.app());
  }

  wrapProduct = (product: ProductsObj) => {
    const productsNumber = Number(product.quantity);
    const productSum = Number(product.quantity) * Number(product.price);

    const productWrapper = makeElements('div', {classes: 'cart-panel__product'});

    const productImg = makeElements('img', {
      attributes: {src: `./images/${product.url}.jpg`},
      classes: 'cart-panel__image'});

    const name = makeElements('h3', {text: product.name});

    const price = makeElements('p', {text: product.price});

    const counter = makeElements('input', {attributes:
      {'type':'number', 'min': '1', 'max': product.instock,
      'id': product.id, 'value': String(product.quantity) }});

    counter.addEventListener('click', (e) => {
      this.updateQuantity((e?.target as HTMLInputElement).id,
        Number((e?.target as HTMLInputElement).value));
    });

    const remover = makeElements('button', { attributes: {'id': product.id},
      classes: 'secondary-button secondary-button-sm',
      text: 'Remove'
    })

    remover.addEventListener('click', (event) => {
      this.removeProduct((event?.target as HTMLElement).id)
    });

    productWrapper.append(productImg, name, price, counter, remover);

    return {productWrapper, productSum, productsNumber};
  }

  setUpCartPanel = () => {
    this.cartPanelHTML.innerHTML = '';
    const savedCartQuantity = localStorage.getItem('app-cart-quantity');
    if(savedCartQuantity){
        this.inCartQuantity = JSON.parse(savedCartQuantity);
    }

    const closeButton = makeElements('button', {classes: 'secondary-button secondary-button-sm', text: 'Close'});
    closeButton.addEventListener('click', this.closeCartPanel)

    const productsWrapper = makeElements('div', {});

    const productsInfo = [];

    for(const item of productsConfig) {
      if(item.id in this.inCartQuantity) {
        const newItem = {...item, quantity: String(this.inCartQuantity[item.id])};
        productsInfo.push(newItem);
      }
    }

    let sum = 0;
    let counter = 0;

    for(const product of productsInfo) {
      const {productWrapper, productSum, productsNumber} = this.wrapProduct(product);
      productsWrapper.append(productWrapper);
      sum += productSum;
      counter += productsNumber;
    }

    const total = makeElements('div', {classes: 'cart-panel__total', text: `$ ${sum.toFixed(2)}`});

    const clearBlock = makeElements('div', {});
    if(this.inCart.length > 0){
      const clearBtn = makeElements('button', {classes: 'secondary-button secondary-button-sm', text: 'Clear cart'});
      clearBtn.addEventListener('click', this.clearCart)
      clearBlock.append(clearBtn);
    } else {
      clearBlock.textContent = 'Nothing in your cart yet'
    }

    const heading = document.createElement('h2');
    heading.textContent = `Your Cart (${counter})`;

    this.cartPanelHTML.append(closeButton, heading, productsWrapper, total, clearBlock);

    this.cartPanelOverlay.addEventListener('click', (event) =>  {
      if((event?.target as HTMLElement).classList.contains('cart-panel__overlay')){
        this.closeCartPanel();
      }
    });
  }

  removeProduct = (id: string) => {
    this.toBeRemoved.push(id);

    delete this.inCartQuantity[id];
    localStorage.setItem('app-cart-quantity', JSON.stringify(this.inCartQuantity));

    this.setUpCartPanel();
  }

  updateQuantity = (id: string, quantity: number) => {
    this.inCartQuantity[id] = quantity;
    localStorage.setItem('app-cart-quantity', JSON.stringify(this.inCartQuantity));

    this.setUpCartPanel();
  }

  clearCart = () => {
    localStorage.setItem('app-cart-quantity', '');

    this.toBeRemoved.push(...this.inCart)
    this.inCart = [];
    this.inCartQuantity = { };

    this.setUpCartPanel();
  }
}
