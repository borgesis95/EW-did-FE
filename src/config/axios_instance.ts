import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    console.log('interceptors');
    const token = localStorage.getItem('accesstoken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

// Alter defaults after instance has been created
