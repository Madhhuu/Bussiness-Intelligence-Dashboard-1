import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const getCustomers = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};

export const createCustomer = async (data) => {
    const response = await axios.post(API_URL, data, getAuthHeaders());
    return response.data;
};

export const updateCustomer = async (id, data) => {
    const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return response.data;
};

export const deleteCustomer = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return response.data;
};

export const getCustomerOrders = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/orders`, getAuthHeaders());
    return response.data;
};
