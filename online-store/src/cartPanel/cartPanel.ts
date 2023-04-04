import { productsConfig } from '../data/products';
import { App, ProductsObj } from '../types/types';

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
    this.cartPanelBtn = document.createElement('div');
    this.cartPanelBtn.textContent = 'Open Cart';

    const savedCart = localStorage.getItem('app-cart');
    if(savedCart){
        this.inCart = JSON.parse(savedCart);
    } else {
        this.inCart = [];
        localStorage.setItem('app-cart', JSON.stringify(this.inCart));
    }
    this.toBeRemoved = [];

    this.cartPanelBtn.classList.add('cart-panel__open');
    this.cartPanelBtn.addEventListener('click', this.openCartPanel);
    this.inCartQuantity = {};
    this.cartPanelOverlay = document.createElement('div');
    this.cartPanelHTML = document.createElement('div');
  }

  openCartPanel = () => {
    this.cartPanelOverlay = document.createElement('div');
    this.cartPanelOverlay.classList.add('cart-panel__overlay');
    this.cartPanelHTML = document.createElement('div');
    this.cartPanelHTML.classList.add('cart-panel__content');

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
    const productSum = Number(product.quantity) * Number(product.price);
    const productWrapper = document.createElement('div');

    const productImg = document.createElement('img');
    productImg.setAttribute('src', `./images/${product.url}.jpg`);
    productImg.classList.add('cart-panel__image');

    const name = document.createElement('h3');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = product.price;

    const counter = document.createElement('input');
    counter.setAttribute('type', 'number');
    counter.setAttribute('min', '1');
    counter.setAttribute('max', product.instock);
    counter.setAttribute('id', product.id);
    counter.setAttribute('value', String(product.quantity));
    counter.addEventListener('click', (e) => {
      this.updateQuantity((e?.target as HTMLInputElement).id,
        Number((e?.target as HTMLInputElement).value));
    });

    const remover = document.createElement('button');
    remover.setAttribute('id', product.id);
    remover.textContent = 'Remove';
    remover.addEventListener('click', (event) => {
      this.removeProduct((event?.target as HTMLElement).id)
    });

    productWrapper.append(productImg, name, price, counter, remover);

    return {productWrapper, productSum};
  }

  setUpCartPanel = () => {
    this.cartPanelHTML.innerHTML = '';
    const savedCartQuantity = localStorage.getItem('app-cart-quantity');
    if(savedCartQuantity){
        this.inCartQuantity = JSON.parse(savedCartQuantity);
    }

    const closeButton = document.createElement('div');

    const heading = document.createElement('h2');

    const productsWrapper = document.createElement('div');

    const productsInfo = [];

    for(const item of productsConfig) {
      if(item.id in this.inCartQuantity) {
        const newItem = {...item, quantity: String(this.inCartQuantity[item.id])};
        productsInfo.push(newItem);
      }
    }

    let sum = 0;

    for(const product of productsInfo) {
      const {productWrapper, productSum} = this.wrapProduct(product);
      productsWrapper.append(productWrapper);
      sum += productSum;
    }

    const total = document.createElement('div');
    total.textContent = sum.toFixed(2);


    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear cart';

    this.cartPanelHTML.append(closeButton, heading, productsWrapper, total, clearBtn);

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
}
