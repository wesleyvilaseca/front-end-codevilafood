import axios from "axios";
import { API_VERSION } from "@/configs/api";

const RESOURCE = '/tenants';

const actions = {
    getCompanies({ commit }) {
        return axios.get(`${API_VERSION}${RESOURCE}`)
            .then(res => {
                commit('SET_COMPANY', res.data)
            });
    }
};

export default actions;