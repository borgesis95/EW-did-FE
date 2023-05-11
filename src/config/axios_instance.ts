import axios from 'axios';
import Cookie from 'js-cookie';
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const cookies = Cookie.get('user') ? JSON.parse(Cookie.get('user')) : null;

    if (cookies && cookies.jwt) {
      config.headers['Authorization'] = `Bearer ${cookies.jwt}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

// Alter defaults after instance has been created
