import axios from "axios";
import { TOKEN_NAME, API_VERSION } from '@/configs/api'

const state = {
    myOrders: {
        data: []
    }
}

const mutations = {
    SET_ORDERS(state, orders) {
        state.myOrders = orders
    },

    SET_ORDER(state, order) {
        state.myOrder.data = order;
    }
}

const actions = {
    getMyOrders({ commit }) {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) Promise.reject();

        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando os pedidos');
        return axios.get(`auth/${API_VERSION}/my-orders`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                commit('SET_ORDERS', res.data);
            }).finally(() => {
                commit('SET_PRELOADER', false);
            })
    },

    get_order({ commit }, identify) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando os pedidos');

        return axios.get(`${API_VERSION}/orders/${identify}`)
            .finally(() => {
                commit('SET_PRELOADER', false);
            })
    },

    evaluationOrders({ commit }, params) {
        const token = localStorage.getItem(TOKEN_NAME);
        if (!token) Promise.reject();

        return axios.post(`auth/${API_VERSION}/orders/${params.identify}/evaluations`,
            params,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
    },

    create_order({ commit }, params) {
        return new Promise((resolve, reject) => {
            axios.post(`${API_VERSION}/orders`, params)
                .then(res => {
                    commit('CLEAR_CART');
                    resolve(res.data.data);
                })
                .catch(res => {
                    reject(res.error);
                })
        })

    },

    create_order_auth({ commit }, params) {
        return new Promise((resolve, reject) => {
            const token = localStorage.getItem(TOKEN_NAME);
            if (!token) Promise.reject();

            axios.post(`auth/${API_VERSION}/orders`, params,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
                .then(res => {
                    commit('CLEAR_CART');
                    resolve(res.data.data);
                })
                .catch(res => {
                    reject(res.error);
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}