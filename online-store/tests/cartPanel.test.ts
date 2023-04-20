import { CartPanel } from '../src/cartPanel/cartPanel';
import { fakeApp } from './mocks/mocks';

beforeEach(() => {
  return localStorage.removeItem('app-cart-quantity');
});

afterEach(() => {
  return localStorage.removeItem('app-cart-quantity');
});

describe('when instantiated first time', () => {

  const cartPanel = new CartPanel(fakeApp);

  it('saves empty cart to class property and Local Storage', () => {
      expect(cartPanel.inCart).toBeDefined();
      expect(cartPanel.inCart).toHaveLength(0);
  })

  it('defines object for quantity of products in cart', () => {
    expect(cartPanel.inCartQuantity).toBeDefined();
  })
})

describe('when updating quantity', () => {
  const cartPanel = new CartPanel(fakeApp);

  it('increments quantity correctly', () => {
    cartPanel.updateQuantity('1', 20);
    expect(cartPanel.inCartQuantity).toHaveProperty('1');
  })
})


describe('when removing from cart', () => {
  const cartPanel = new CartPanel(fakeApp);

  it('adds to removed products list correctly', () => {
    cartPanel.removeProduct('1');
    expect(cartPanel.toBeRemoved).toContain('1');
  })
})


describe('when clearing cart', () => {
  const cartPanel = new CartPanel(fakeApp);

  it('clear respective properties', () => {
    cartPanel.clearCart();
    expect(cartPanel.inCart.length).toBe(0);
    expect(cartPanel.inCartQuantity).toMatchObject({});
  })
})
