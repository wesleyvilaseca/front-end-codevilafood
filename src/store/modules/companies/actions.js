import axios from "axios";
import { API_VERSION } from "@/configs/api";

const RESOURCE = '/tenants';

const actions = {
    getCompanies({ commit }) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando as empresas');

        return axios.get(`${API_VERSION}${RESOURCE}`)
            .then(res => {
                commit('SET_COMPANIES', res.data)
            })
            .finally(() => commit('SET_PRELOADER', false));
    },

    getCategoryByCompany({ commit }, uuid) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando as categorias...');

        const params = { uuid };

        return axios.get(`${API_VERSION}/categories`, { params })
            .then(res => {
                commit('SET_CATEGORIES_COMPANY', res.data)
            })
            .finally(() => commit('SET_PRELOADER', false)); I
    },

    getCompanyByFlag({ commit }, flag) {
        commit('SET_PRELOADER', true);
        return axios.get(`${API_VERSION}${RESOURCE}-by-flag/${flag}`)
            .then(res => {
                commit('SET_COMPANY', res.data.data)
            })
            .finally(() => commit('SET_PRELOADER', false));
    },

    getCompanyByUuid({ commit }, uuid) {
        commit('SET_PRELOADER', true);
        return axios.get(`${API_VERSION}${RESOURCE}/${uuid}`)
            .then(res => {
                commit('SET_COMPANY', res.data.data)
            })
            .finally(() => commit('SET_PRELOADER', false));
    },

    getProductsByCompany({ commit }, params) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando os produtos...');
        return axios.get(`${API_VERSION}/products`, { params })
            .then(res => { commit('SET_PRODUCTS_COMPANY', res.data) })
            .finally(() => commit('SET_PRELOADER', false));
    },

    getTableFromCompany({ commit }, params) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando as mesas...');
        return axios.get(`${API_VERSION}/tables/${params.table}`, params)
            .then(res => {
                commit('SET_TABLE_COMPANY', res.data.data)
            })
            .finally(() => commit('SET_PRELOADER', false));
    }
};

export default actions;