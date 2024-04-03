import axios from 'axios';

export const api = axios.create({
    baseURL: "https://rocketnote-backend-gxtz.onrender.com"
});
