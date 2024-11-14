import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

export const loginUserAPI = async (username: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/users/login`, { username, password });
  return response.data;
};

export const registerUserAPI = async (userData: {
  username: string;
  password: string;
  organization: string;
  region?: string;
}) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  return response.data;
};

export const fetchUserDataAPI = async (token: string) => {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  
