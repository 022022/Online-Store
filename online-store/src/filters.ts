import { FiltersGroupObj } from './types/types';


export const filtersConfig: Array<FiltersGroupObj> = [
    {
        filtersGroupName: "Release date",
        filters: [
            {
                filterType: "range",
                id: "releaseDate", // must be the same as in products json
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
                filterAttrs: {
                    min: "0",   // .setAttribute
                    step: "1",
                    max: "10",
                    value: "3",
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
                filterAttrs: {
                    name: "huawei",
                }
            },
            {
                id: "brand-apple", // must be the same as in products json
                filterType: "checkbox",
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
                filterAttrs: {
                    name: "color-red",
                }
            },
            {
                id: "color-black", // must be the same as in products json
                filterType: "checkbox",
                filterAttrs: {
                    name: "color-black",
                }
            },
        ]
    },
]
