'use client';

import React, { useEffect, useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { Radio, RadioChangeEvent } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { AddtoCart, BuyNow } from '@/components/Icons';
import { colorPicker, sizePicker } from '@/constants/options';
import { useModelStore } from '@/store/zustandStore';
import RadioColor from '@/components/CustomAntd/RadioColor';
import QtyInput from '@/components/CustomAntd/QtyInput';
import RadioSize from '@/components/CustomAntd/RadioSize';
import { shuffleArray } from '@/utils/mathUtils';
import ProductItem, {
  IProductItem,
} from '@/modules/Shop/ProductList/ProductItem';
import { useGetProduct } from '@/api/getProduct';
import useRouterEffect from '@/hooks/useRouterEffect';

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
  const {
    name,
    image,
    description,
    size,
    color,
    price,
    countInStock,
    rating,
    numReviews,
  } = data;

  const dispatch = useDispatch();
  const router = useRouter();
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

  const { products, loading } = useGetProduct();

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
    routerEffect('/payment')
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
    const temp = [...products];
    let shuffleProducts: IProductItem[] = shuffleArray(temp);
    if (shuffleProducts.length) {
      setRecommendProducts([
        shuffleProducts[0],
        shuffleProducts[1],
        shuffleProducts[2],
      ]);
    }
  }, [loading]);

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

            <RadioSize
              sizeModel={sizeModel}
              handleSizeChange={handleSizeChange}
              className={s.wrapContent_size}
            />
          </div>

          <QtyInput qty={qty} setQty={setQty} className={s.wrapContent_qty} />
        </div>

        <div className={s.wrapContent_buttons}>
          <button disabled={data.countInStock === 0} onClick={buyNowHandler}>
            <BuyNow /> <span>Buy Now</span>
          </button>
          <button disabled={data.countInStock === 0} onClick={addToCartHandler}>
            <AddtoCart /> <span>Add to cart</span>
          </button>
        </div>

        <div className={s.wrapContent_desc}>{description}</div>

        <div className={s.wrapContent_status}>
          status: {countInStock <= 0 ? 'Out of stock' : 'In stock'}
        </div>
      </div>
      <p
        className={`${s.storyWork_title} ${cinzelFont.className} col-span-3`}
        // ref={titleRef}
      >
        <span>Y</span>ou may also love
      </p>
      <div className={`${s.productList} col-span-12`}>
        {recommendProducts &&
          recommendProducts.map((product: IProductItem) => (
            <ProductItem key={product._id} data={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductModules;
