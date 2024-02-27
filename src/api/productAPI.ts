import { PRODUCTS_URL, UPLOADS_URL } from '@/constants/route';
import { deleteMethod, get, post, put } from './requestMethod';
import { IProductsQuery } from '@/modules/Shop/ProductList';

export const getProduct = async (queryParam: IProductsQuery) => {
  const res = await get(
    `${PRODUCTS_URL}?page=${queryParam.page}&limit=${queryParam.limit}&sort=price,${queryParam.sort}&search=${queryParam.search}`
  );
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
