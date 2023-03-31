import axios from 'axios';

export const axios_instance = axios.create({
  baseURL: 'http://localhost:3001/'
});

// Alter defaults after instance has been created
