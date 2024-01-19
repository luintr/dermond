import { USERS_URL } from '@/constants/route';
import { deleteMethod, get, post, put } from './requestMethod';

export const login = async (data: any) => {
  const res = await post(`${USERS_URL}/auth`, data);
  return res;
};
export const register = async (data: any) => {
  const res = await post(`${USERS_URL}/register`, data);
  return res;
};
export const logout = async (data: any) => {
  const res = await post(`${USERS_URL}/logout`, data);
  return res;
};
export const profile = async (data: any) => {
  const res = await put(`${USERS_URL}/profile`, data);
  return res;
};

export const getUsers = async () => {
  const res = await get(`${USERS_URL}`);
  return res;
};

export const getUserDetail = async (userID: string) => {
  const res = await get(`${USERS_URL}/${userID}`);
  return res;
};

export const deleteUser = async (userID: string) => {
  const res = await deleteMethod(`${USERS_URL}/${userID}`);
  return res;
};

export const updateUser = async (data: any) => {
  const res = await put(`${USERS_URL}/${data._id}`, data);
  return res;
};
