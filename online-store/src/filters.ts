import { FiltersGroupObj } from './types/types';


export const filtersConfig: Array<FiltersGroupObj> = [
    {
        filtersGroupName: "Release date",
        filters: [
            {
                filterType: "range",
                id: "releaseDate", // must be the same as in products json
                state: '2021',
                filterAttrs: {
                    min: "2016",   // .setAttribute
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
                id: "quantity", // must be the same as in products json
                filterType: "range",
                state: '8',
                filterAttrs: {
                    min: "0",   // .setAttribute
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
                id: "brand-huawei", // must be the same as in products json
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "huawei",
                }
            },
            {
                id: "brand-apple", // must be the same as in products json
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
                id: "color-red", // must be the same as in products json
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-red",
                }
            },
            {
                id: "color-black", // must be the same as in products json
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-black",
                }
            },
        ]
    },
]
