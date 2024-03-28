import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/products';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getProductDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const removeProduct = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addProduct = async (product) => {
    return axios.post(`${BASE_URL}/add`, JSON.stringify(product), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const editProduct = (id, product) => {
    return axios.put(`${BASE_URL}/${id}`, JSON.stringify(product), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
};