import axios from "axios";
import { API_VERSION } from "@/configs/api";

const RESOURCE = '/tenants';

const actions = {
    getCompanies({ commit }) {
        commit('SET_PRELOADER', true);
        commit('SET_TEXT_PRELOADER', 'Carregando as empresas');

        return axios.get(`${API_VERSION}${RESOURCE}`)
            .then(res => {
                commit('SET_COMPANY', res.data)
            })
            .finally(() => commit('SET_PRELOADER', false));
    }
};

export default actions;