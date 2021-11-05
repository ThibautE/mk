import axios from 'axios';

const url = 'http://localhost:3001';

export const getRequest = async (route) => axios.get(url + route);

export const postRequest = async (route, data = {}) => axios.post(url + route, data);

export const putRequest = async (route, data = {}) => axios.put(url + route, data);

export const deleteRequest = async (route) => axios.delete(url + route);
