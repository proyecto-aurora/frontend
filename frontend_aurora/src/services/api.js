import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://172.27.90.226:8000/api/';

export const getAreas = () => axios.get(`${API_URL}area/`);
export const getEstados = () => axios.get(`${API_URL}estados/`);
export const createArea = (nuevaArea) => axios.post(`${API_URL}area/`, nuevaArea);
