import { SortV } from '../src/view/sortv';

describe('when called', () => {

    const sort = new SortV();
    const expected = '<select class="sort"><option value="name-a"></option><option value="name-z" selected="true"></option><option value="released-new"></option><option value="released-old"></option></select>';

    sort.renderSorting ('name-z');

    it('appends sort field html to class property', () => {
        expect(sort.sortHTML.innerHTML).toBe(expected);
    });
});