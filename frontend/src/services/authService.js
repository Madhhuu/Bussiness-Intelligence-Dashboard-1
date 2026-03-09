import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const updateProfile = async (userData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}/profile`, userData, config);
    return response.data;
};

const updatePassword = async (passwordData) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(`${API_URL}/password`, passwordData, config);
    return response.data;
};

const authService = {
    updateProfile,
    updatePassword,
};

export default authService;
