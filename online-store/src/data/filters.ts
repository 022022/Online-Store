import { FiltersGroupObj } from '../types/types';


export const filtersConfig: Array<FiltersGroupObj> = [
    {
        filtersGroupName: "Release date",
        filters: [
            {
                filterType: "range",
                id: "releaseDate",
                state: '2021',
                filterAttrs: {
                    min: "2016",
                    step: "1",
                    max: "2021",
                    value: "2021",
                }
            },
        ]
    },

    {
        filtersGroupName: "Quantity",
        filters: [
            {
                id: "quantity",
                filterType: "range",
                state: '8',
                filterAttrs: {
                    min: "0",
                    step: "1",
                    max: "10",
                    value: "1",
                }
            },
        ]
    },

    {
        filtersGroupName: "Brand",
        filters: [
            {
                id: "brand-huawei",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "huawei",
                }
            },
            {
                id: "brand-apple",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "apple",
                }
            },
        ]
    },

    {
        filtersGroupName: "Color",
        filters: [
            {
                id: "color-red",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-red",
                }
            },
            {
                id: "color-black", 
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-black",
                }
            },
        ]
    },
]
