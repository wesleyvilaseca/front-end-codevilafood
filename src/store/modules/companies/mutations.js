const mutations = {
    SET_COMPANIES(state, companies) {
        state.items = companies
    },

    SET_COMPANY(state, company) {
        state.companySelected = company
    },

    SET_CATEGORIES_COMPANY(state, categories) {
        state.categoriesCompanySelected = categories;
    },

    SET_PRODUCTS_COMPANY(state, products) {
        state.productsCompanySelected = products
    },

    SET_TABLE_COMPANY(state, table) {
        state.companySelected.table = table
    },

    REMOVE_TABLE_COMPANY(state, table) {
        state.companySelected.table = {
            identify: '',
            description: '',
            name: ''
        }
    },

    REMOVE_COMPANY_SELECTED(state) {
        state.companySelected = {
            name: '',
            uuid: '',
            products: [],
            table: {
                identify: '',
                description: '',
                name: ''
            }
        };

        state.categoriesCompanySelected = {
            data: []
        }
    }
};

export default mutations;