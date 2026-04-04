const config = {
    // Dynamically use the environment variable if available, otherwise fallback to localhost for local development
    API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
};

export default config;
