import { FiltersM } from '../src/model/filterm';
import { filtersConfig } from '../src/data/filters';
import { filters } from './mocks/filtersMock';



beforeEach(() => {
    return localStorage.removeItem('app-filters');
});

afterEach(() => {
    return localStorage.removeItem('app-filters');
});



describe('when instantiated first time', () => {

    const filtersModel = new FiltersM();

    it('saves filtersConfig to class property', () => {
        expect(filtersModel.filters).toEqual(filtersConfig);
    })
})



describe('when called', () => {
    const filtersModel = new FiltersM;
    filtersModel.filters = filters;

    filtersModel.saveToLocalStorage();

    const savedFilters = localStorage.getItem('app-filters');
    let filtersParsed: string[];
    if(savedFilters) filtersParsed = JSON.parse(savedFilters);

    it('saves class property contents to Local Storage', () => {
        expect(filtersParsed).toEqual(filters);
    })
})