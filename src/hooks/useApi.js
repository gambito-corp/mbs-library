import { useState, useCallback } from 'react';
import axios from 'axios';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Configuración base de axios
    const apiClient = axios.create({
        baseURL:  process.env.REACT_APP_API_BASE_URL,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    // Interceptor para agregar el token automáticamente
    apiClient.interceptors.request.use((config) => {
        const tokenKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;
        const token = localStorage.getItem(tokenKey);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Interceptor para manejar errores de autenticación
    apiClient.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                const tokenKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;
                const loginUrl = process.env.REACT_APP_LOGIN_URL;
                localStorage.removeItem(tokenKey);
                window.location.href = loginUrl;
            }
            return Promise.reject(error);
        }
    );

    // Función genérica para hacer peticiones
    const makeRequest = useCallback(async (method, url, data = null, config = {}) => {
        setLoading(true);
        setError(null);

        try {
            let response;

            switch (method.toLowerCase()) {
                case 'get':
                    response = await apiClient.get(url, config);
                    break;
                case 'post':
                    response = await apiClient.post(url, data, config);
                    break;
                case 'put':
                    response = await apiClient.put(url, data, config);
                    break;
                case 'patch':
                    response = await apiClient.patch(url, data, config);
                    break;
                case 'delete':
                    response = await apiClient.delete(url, config);
                    break;
                default:
                    throw new Error(`Método HTTP no soportado: ${method}`);
            }

            return {
                success: true,
                data: response.data,
                status: response.status
            };

        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Error en la petición';
            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: err.response?.status
            };
        } finally {
            setLoading(false);
        }
    }, []);

    // Métodos específicos para cada tipo de petición
    const get = useCallback((url, config = {}) => makeRequest('get', url, null, config), [makeRequest]);
    const post = useCallback((url, data, config = {}) => makeRequest('post', url, data, config), [makeRequest]);
    const put = useCallback((url, data, config = {}) => makeRequest('put', url, data, config), [makeRequest]);
    const patch = useCallback((url, data, config = {}) => makeRequest('patch', url, data, config), [makeRequest]);
    const del = useCallback((url, config = {}) => makeRequest('delete', url, null, config), [makeRequest]);

    return {
        loading,
        error,
        get,
        post,
        put,
        patch,
        delete: del,
        makeRequest
    };
};
