import { productsConfig } from '../src/data/products';
import { ProductsC } from '../src/controller/productsc';
import { fakeproductsModel, fakeproductsView } from './mocks/mocks';
import { filters } from './mocks/filtersMock';

describe('when given products, filters and other settings', () => {

    const productsC = new ProductsC(fakeproductsModel, fakeproductsView);

    const filtered = [
        {
            id: '1',
            name: 'Mi Band 2',
            brand: 'xiaomi',
            color: 'black',
            url: 'xiaomi-mi-band-2-black',
            bandmaterial: 'silicone',
            released: '2016',
            instock: '12',
            incart: 'yes',
        },
    ];
    const products = productsConfig;
    const sortOrder = 'name-a';
    const searchWord = 'ba';
    const inCart = ['1', '2'];

    it('returns the result of filtering', () => {
        const result = productsC.arrangeProducts(filters, products, inCart, sortOrder, searchWord);
        const expected = filtered;
        expect(result).toEqual(expected);
    });
});
