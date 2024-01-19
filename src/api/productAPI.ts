import { PRODUCTS_URL, UPLOADS_URL } from '@/constants/route';
import { deleteMethod, get, post, put } from './requestMethod';

export const getProduct = async () => {
  const res = await get(`${PRODUCTS_URL}`);
  return res;
};

export const getProductDetail = async (productId: string | number) => {
  const res = await get(`${PRODUCTS_URL}/${productId}`);
  return res;
};

export const createProduct = async () => {
  const res = await post(`${PRODUCTS_URL}`);
  return res;
};

export const updateProduct = async (data: any) => {
  const res = await put(`${PRODUCTS_URL}/${data._id}`, data);
  return res;
};

export const uploadProductImage = async (data: any) => {
  const res = await post(`${UPLOADS_URL}`, data);
  return res;
};

export const deleteProduct = async (productId: string | number) => {
  const res = await deleteMethod(`${PRODUCTS_URL}/${productId}`);
  return res;
};
