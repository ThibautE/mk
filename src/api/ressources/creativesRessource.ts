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
export async function getCreativeById(uuid: string){
    const { data } = await api.getRequest(`/creatives/${uuid}`);
    return data
}

/**
 * update a creative
 * @param uuid, the id of the creative
 * @param info, the id of the creative
 * @returns {Promise<*>}, The creative object if successfully updated, an error else
 */
 export const updateCreative = (uuid: string, bodyData: any) => api.putRequest(`/creatives/${uuid}`, bodyData).then(res => console.log(res)
 );

/**
 * Delete a creative
 * @param uuid, the id of the creative
 * @returns {Promise<*>}, The creative object if successfully deleted, an error else
 */
export async function deleteCreative(uuid: string){
    const { data } = await api.deleteRequest(`/creatives/${uuid}`);
    return data
}