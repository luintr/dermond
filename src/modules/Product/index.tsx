'use client';

import React, { useEffect, useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { Flex, RadioChangeEvent, Space } from 'antd';
import { useDispatch } from 'react-redux';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { AddtoCart, BuyNow } from '@/components/Icons';
import { useModelStore } from '@/store/zustandStore';
import RadioColor from '@/components/CustomAntd/RadioColor';
import RadioSize from '@/components/CustomAntd/RadioSize';
import { shuffleArray } from '@/utils/mathUtils';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import { useGetProduct } from '@/api/getProduct';
import useRouterEffect from '@/hooks/useRouterEffect';
import IncrementAndDecrementButton from '@/components/IncrementAndDecrementButton';
import { Button } from '@/components/Button';
import { TypographyBody } from '@/components/Typography';
import { useGetProductsQuery } from '@/store/slices/productApiSlice';

type IProduct = {
  _id: string;
  name: string;
  image: string;
  description: string;
  size: 'S' | 'M' | 'L';
  color: 'be' | 'brown' | 'black' | 'white';
  brand: string;
  category: string;
  countInStock: number;
  price: number;
  rating: number;
  numReviews: number;
};

const ProductModules = ({ data }: { data: IProduct }) => {
  const { name, image, description, size, color, price, countInStock } = data;

  const dispatch = useDispatch();
  const { setModelToggle } = useModelStore();
  const { routerEffect } = useRouterEffect();

  const [qty, setQty] = useState<number>(1);
  const [sizeModel, setSizeModel] = useState<'S' | 'M' | 'L'>(size);
  const [recommendProducts, setRecommendProducts] = useState<IProductItem[]>(
    []
  );
  const [colorModel, setColorModel] = useState<
    'be' | 'brown' | 'black' | 'white'
  >(color);

  const { data: products, isLoading } = useGetProductsQuery('Product');

  const getErrorMessage = (error: any): string => {
    if (error && typeof error.status === 'number') {
      return `Error status: ${error.status}`;
    }
    return 'An error occurred';
  };

  const buyNowHandler = async () => {
    await dispatch(
      addToCart({ ...data, qty, size: sizeModel, color: colorModel })
    );
    routerEffect('/payment');
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data, qty, size: sizeModel, color: colorModel }));
    setModelToggle();
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSizeModel(e.target.value);
  };

  const handleColorChange = (e: RadioChangeEvent) => {
    setColorModel(e.target.value);
  };

  useEffect(() => {
    if (products) {
      const temp = [...products.data];
      let shuffleProducts: IProductItem[] = shuffleArray(temp);
      if (shuffleProducts) {
        setRecommendProducts([
          shuffleProducts[0],
          shuffleProducts[1],
          shuffleProducts[2],
        ]);
      }
    }
  }, [isLoading, products]);

  return (
    <div className={`${s.productDetail} container grid grid-cols-12`}>
      <div className={`${s.productDetail_img} col-span-6 col-start-1`}>
        <img src={image} alt={name} />
      </div>
      <div className={`${s.wrapContent} col-span-6 col-start-7`}>
        <h1 className={`${s.wrapContent_title} ${cinzelFont.className}`}>
          {name}
        </h1>

        <div className={s.wrapContent_price}>$ {price}</div>

        <div className={s.wrapContent_options}>
          <div className={s.leftOptions}>
            <RadioColor
              colorModel={colorModel}
              handleColorChange={handleColorChange}
              className={s.wrapContent_color}
            />
          </div>

          <Flex
            align="center"
            justify="space-between"
            className={s.wrapContent_selectWrapper}
          >
            <RadioSize
              sizeModel={sizeModel}
              handleSizeChange={handleSizeChange}
              className={s.wrapContent_size}
            />

            <IncrementAndDecrementButton amount={qty} setAmount={setQty} />
          </Flex>
          <Flex align="center" justify="space-between">
            <Button variant="text" className={s.wrapContent_sizeGuideBtn}>
              <TypographyBody size={16} color="coral">
                VIEW SIZE GUIDE
              </TypographyBody>
            </Button>
            <TypographyBody size={16} color="black">
              2004 in-stock
            </TypographyBody>
          </Flex>

          {/* <QtyInput qty={qty} setQty={setQty} className={s.wrapContent_qty} /> */}
        </div>

        <Flex className={s.wrapContent_buttons}>
          <Button
            color="black"
            disabled={data.countInStock === 0}
            onClick={buyNowHandler}
          >
            <BuyNow /> <span>Buy Now</span>
          </Button>
          <Button
            variant="outlined"
            disabled={data.countInStock === 0}
            onClick={addToCartHandler}
          >
            <AddtoCart /> <span>Add to cart</span>
          </Button>
        </Flex>

        <div className={s.wrapContent_desc}>{description}</div>

        {/* <div className={s.wrapContent_status}>
          status: {countInStock <= 0 ? 'Out of stock' : 'In stock'}
        </div> */}
      </div>
      <p
        className={`${s.storyWork_title} ${cinzelFont.className} col-span-3`}
        // ref={titleRef}
      >
        <span>Y</span>ou may also love
      </p>
      <div className={`${s.productList} col-span-12 grid-cols-12 grid`}>
        {recommendProducts &&
          recommendProducts.map((product: IProductItem) => (
            <ProductItem key={product._id} data={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductModules;
