import axiosInstance from './axiosConfig';

export const fetchMissilesApi = async () => {
  const response = await axiosInstance.get('/users/missiles');
  return response.data;
};

export const buyMissileApi = async (missileId: string) => {
  const response = await axiosInstance.post(`/missiles/buy`, { missileId });
  return response.data;
};

export const addMissileApi = async (missileData: { name: string; price: number }) => {
  const response = await axiosInstance.post(`/missiles`, missileData);
  return response.data;
};
