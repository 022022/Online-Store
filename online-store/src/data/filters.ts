import { FiltersGroupObj } from '../types/types';


export const filtersConfig: Array<FiltersGroupObj> = [
    {
        filtersGroupName: "Released",
        filters: [
            {
                filterType: "range",
                id: "released",
                state: '2021',
                filterAttrs: {
                    min: "2016",
                    step: "1",
                    max: "2021",
                    valueFrom: "2016",
                    valueTo: "2021",
                }
            },
        ]
    },

    {
        filtersGroupName: "In Stock",
        filters: [
            {
                id: "instock",
                filterType: "range",
                state: '8',
                filterAttrs: {
                    min: "0",
                    step: "1",
                    max: "12",
                    valueFrom: "0",
                    valueTo: "12",
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
                id: "brand-lenovo",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "lenovo",
                }
            },
            {
                id: "brand-xiaomi",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "xiaomi",
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
            {
                id: "color-blue",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-blue",
                }
            },
            {
                id: "color-green",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-green",
                }
            },
            {
                id: "color-pink",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "color-pink",
                }
            },
        ]
    },

    {
        filtersGroupName: "Band Material",
        filters: [
            {
                id: "bandmaterial-plastic",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "bandmaterial-plastic",
                }
            },
            {
                id: "bandmaterial-silicone",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "bandmaterial-silicone",
                }
            },
            {
                id: "bandmaterial-rubber",
                filterType: "checkbox",
                state: 'off',
                filterAttrs: {
                    name: "bandmaterial-rubber",
                }
            },
        ]
    },
]
