const mutations = {
    ADD_PRODUCT_CART(state, product) {
        state.products.data.push({
            qty: 1,
            identify: product.identify,
            product,
        });
    },

    REMOVE_PROD_CART(state, product) {
        state.products.data = state.products.data.filter((productCart, index) => {
            return productCart.identify !== product.identify;
        });
    },

    INCREMENT_QTY_PROD_CART(state, product) {
        state.products.data = state.products.data.map((productCart, index) => {
            if (productCart.identify === product.identify) {
                state.products.data[index].qty ++;
            }

            return state.products.data[index];
        });
    },


    DECREMENT_QTY_PROD_CART(state, product) {
        state.products.data = state.products.data.filter((productCart, index) => {
            if (productCart.identify == product.identify) {
                state.products.data[index].qty =  state.products.data[index].qty - 1 ;
            }

            if (state.products.data[index].qty > 0)
                return state.products.data[index];
        });
    },

};

export default mutations;