import {useEffect, useState} from 'react';
import {useApi} from './useApi';

export const useAuthFromLaravel = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const api = useApi();

    useEffect(() => {
        const getTokenFromLaravel = async () => {
            try {
                const endpoint = process.env.REACT_APP_GET_TOKEN_ENDPOINT;
                const result = await api.get(endpoint);

                if (result.success) {
                    const tokenKey = process.env.REACT_APP_TOKEN_STORAGE_KEY;

                    setToken(result.data.token);
                    setUser(result.data.user);
                    localStorage.setItem(tokenKey, result.data.token);
                } else {
                    window.location.href = process.env.REACT_APP_LOGIN_URL;
                }

            } catch (error) {
                console.log(error);
                window.location.href = process.env.REACT_APP_LOGIN_URL;
            } finally {
                setLoading(false);
            }
        };

        getTokenFromLaravel();
    }, []);

    return { token, user, loading };
};
