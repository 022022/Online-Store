import { SearchV } from '../src/view/searchv';

describe('when instantiated', () => {

    const search = new SearchV();
    const expected = document.createElement('input');

    it('has searchField property with an input element', () => {
        expect(search).toHaveProperty('searchField', expected);
    })
})
