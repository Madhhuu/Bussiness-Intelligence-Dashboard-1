import axios from 'axios';
import config from '../config';

const API_URL = `${config.API_URL}/sales`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getSales = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const getSaleById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};

export const createSale = async (saleData) => {
    const response = await axios.post(API_URL, saleData, getAuthHeaders());
    return response.data;
};

export const updateSale = async (id, saleData) => {
    const response = await axios.put(`${API_URL}/${id}`, saleData, getAuthHeaders());
    return response.data;
};

export const deleteSale = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};
