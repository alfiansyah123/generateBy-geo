import axios from 'axios';

const apiClient = axios.create({
    baseURL: '/api', // Vite proxy will redirect this to the backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Add interceptors for error handling or auth tokens
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors (e.g., 401 Unauthorized)
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default apiClient;
