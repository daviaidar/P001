import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const iphoneService = {
    getAll: () => api.get('/iphones'),
    getById: (id) => api.get(`/iphones/${id}`),
    create: (data) => api.post('/iphones', data),
    update: (id, data) => api.put(`/iphones/${id}`, data),
    delete: (id) => api.delete(`/iphones/${id}`)
};

export const clienteService = {
    getAll: () => api.get('/clientes'),
    create: (data) => api.post('/clientes', data)
};

export default api;
