export const fakeCartModel = {
    addToCart: jest.fn(),
    inCart: ['19'],
    removeFromCart: jest.fn(),
    quantity: 1,
};

export const fakeCartView = {
    cartHTML: document.createElement('div'),
    warning: document.createElement('div'),
    createCart: jest.fn(),
    listenAddToCart: jest.fn(),
    showModal: jest.fn(),
};

export const fakeApp = jest.fn();

export const fakeproductsModel = {
    products: [],
}

export const fakeproductsView = {
    productsHTML: document.createElement('div'),
    render: jest.fn(),
}