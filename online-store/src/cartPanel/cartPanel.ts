import { productsConfig } from '../data/products';
import { App } from '../types/types';

export class CartPanel {
  cartPanelBtn;
  cartPanelHTML;
  cartPanelOverlay;
  inCart: string[];
  app: App;

  constructor (app: App) {
    this.app = app;
    this.cartPanelBtn = document.createElement('div');
    this.cartPanelBtn.textContent = 'Open Cart';

    this.cartPanelBtn.classList.add('cart-panel__open');
    this.cartPanelBtn.addEventListener('click', this.openCartPanel);
    this.inCart = [];
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
    currentPanel?.addEventListener('animationend', () => this.app());
  }

  setUpCartPanel = () => {
    this.cartPanelHTML.innerHTML = '';
    const savedCart = localStorage.getItem('app-cart');
    if(savedCart){
        this.inCart = JSON.parse(savedCart);
    }

    const closeButton = document.createElement('div');

    const heading = document.createElement('h2');

    const productsWrapper = document.createElement('div');

    const productsInfo = productsConfig.filter((item) => this.inCart.includes(item.id));

    for(const product of productsInfo) {
      console.log('setUpCartPanel')
      const productWrapper = document.createElement('div');

      const productImg = document.createElement('img');
      productImg.setAttribute('src', `./images/${product.url}.jpg`);
      productImg.classList.add('cart-panel__image');

      const name = document.createElement('h3');
      name.textContent = product.name;

      const counter = document.createElement('input');
      counter.setAttribute('type', 'number');
      counter.setAttribute('value', 'number');

      const remover = document.createElement('button');
      remover.setAttribute('id', product.id);
      remover.textContent = 'Remove';
      remover.addEventListener('click', (event) => {
        this.removeProduct((event?.target as HTMLElement).id)
      });

      productWrapper.append(productImg, name, counter, remover);
      productsWrapper.append(productWrapper);
    }

    const total = document.createElement('div');
    total.textContent = String(this.inCart.length);


    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear cart';

    this.cartPanelHTML.append(closeButton, heading, productsWrapper, total, clearBtn);

    this.cartPanelOverlay.addEventListener('click', (event) =>  {
      console.log(event);
      if((event?.target as HTMLElement).classList.contains('cart-panel__overlay')){
        this.closeCartPanel();
      }
    });
  }

  removeProduct = (id: string) => {
    const filtered = this.inCart.filter((item) => item !== id);
    localStorage.setItem('app-cart', JSON.stringify(filtered));
    this.setUpCartPanel();
  }




}
