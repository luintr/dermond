'use client';

import React, { useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { Radio, RadioChangeEvent } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import s from './style.module.scss';
import { cinzelFont } from '@/utils/fonts';
import { AddtoCart, BuyNow } from '@/components/Icons';
import { colorPicker } from '@/constants/colors';
import { useModelStore } from '@/store/zustandStore';

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

  const [qty, setQty] = useState<number>(1);
  const [sizeModel, setSizeModel] = useState<'S' | 'M' | 'L'>(size);
  const [colorModel, setColorModel] = useState<
    'be' | 'brown' | 'black' | 'white'
  >(color);

  const buyNowHandler = () => {
    dispatch(addToCart({ ...data, qty, size: sizeModel, color: colorModel }));
    router.push('/cart');
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...data, qty, size: sizeModel, color: colorModel }));
    setModelToggle()
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSizeModel(e.target.value);
  };
  const handleColorChange = (e: RadioChangeEvent) => {
    setColorModel(e.target.value);
  };

  const handleMinusQty = () => {
    setQty(qty - 1);
  };
  const handlePlusQty = () => {
    setQty(qty + 1);
  };

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
            <div className={s.wrapContent_color}>
              <Radio.Group value={colorModel} onChange={handleColorChange}>
                {colorPicker.map((item, index) => (
                  <Radio.Button
                    key={index}
                    value={item.name}
                    style={{ backgroundColor: item.color }}
                  >
                    {item.name}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            <div className={s.wrapContent_size}>
              <Radio.Group value={sizeModel} onChange={handleSizeChange}>
                <Radio.Button value="S">S</Radio.Button>
                <Radio.Button value="M">M</Radio.Button>
                <Radio.Button value="L">L</Radio.Button>
              </Radio.Group>
            </div>
          </div>

          <div className={s.wrapContent_qty}>
            <button className={s.button} onClick={handleMinusQty}>
              <span>-</span>
            </button>
            <div className={s.qty}>
              <span>{qty}</span>
            </div>
            <button className={s.button} onClick={handlePlusQty}>
              <span>+</span>
            </button>
          </div>
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
    </div>
  );
};

export default ProductModules;
