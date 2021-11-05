import * as api from "../services/apiService";

/**
 * Get all the creatives
 * @returns {Promise<*>}, list of creatives
 */
export async function getAllCreative(page?: number, limit?: number) {
    let query : string = "";
    if (page && limit) {
        query = `/creatives?_page=${page}&_limit=${limit}`;
    } else {
        query = `/creatives`;
    }
    const { data } = await api.getRequest(query);
    return data
}

/**
 * Get one creative
 * @param uuid, the id of the creative
 * @returns {Promise<*>}, the creative needed
 */
export async function getCreative(uuid: string){
    const { data } = await api.getRequest(`/creatives/${uuid}`);
    return data
}

/**
 * Create a creative
 * @returns {Promise<*>}, the creative object created if successfully added, an error else
 */
export async function createCreative(){
    const { data } = await api.postRequest(`/creatives/`);
    return data
}

/**
 * update a creative
 * @param uuid, the id of the creative
 * @returns {Promise<*>}, The creative object if successfully updated, an error else
 */
export async function updateCreative(uuid: string){
    const { data } = await api.putRequest(`/creatives/${uuid}`);
    return data
}

/**
 * Delete a creative
 * @param uuid, the id of the creative
 * @returns {Promise<*>}, The creative object if successfully deleted, an error else
 */
export async function deleteCreative(uuid: string){
    const { data } = await api.deleteRequest(`/creatives/${uuid}`);
    return data
}