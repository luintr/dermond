import { IProductItem } from "@/modules/Home/ProductList/ProductItem";
import { useEffect, useState } from "react";

import { get } from '@Api/requestMethod';
import { PRODUCTS_URL } from "@/constants/route";

export const useGetProduct = () => {
  const [products, setProducts] = useState<IProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get<IProductItem[]>(`${PRODUCTS_URL}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products]);

  return { products, loading }
}