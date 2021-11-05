import * as api from "../services/apiService";

/**
 * Get user
 * @returns {Promise<*>}, user informations
 */
export async function getUser(){
    const { data } = await api.getRequest(`/user`);
    return data
}