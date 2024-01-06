'use client';

import React, { useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { Select as AntdSelect } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

type IProduct = {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  countInStock: number;
  price: number;
  rating: number;
  numReviews: number;
};

const ProductModules = ({ data }: { data: IProduct }) => {
  const { Option } = AntdSelect;

  const { name, image, description, price, countInStock, rating, numReviews } =
    data;

  const dispatch = useDispatch();
  const router = useRouter();

  const [qty, setQty] = useState<number>(1);

  const addtoCartHandler = () => {
    dispatch(addToCart({ ...data, qty }));
    router.push('/cart');
  };

  return (
    <div className={`container grid-cols-12`}>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <h1>{name}</h1>
        <div>
          <div>rate: {rating}</div>
          <div>{numReviews}</div>
        </div>
        <div>price: ${price}</div>
        <div>desc: {description}</div>
      </div>

      <div>
        <div>price: ${price}</div>
        <div>status: {countInStock <= 0 ? 'Out of stock' : 'In stock'}</div>
        {data.countInStock > 0 && (
          <div>
            <div>
              <div>Qty</div>
              <div>
                <AntdSelect
                  value={qty.toString()}
                  onChange={value => setQty(Number(value))}
                >
                  {Array.from({ length: data.countInStock }, (_, index) => (
                    <Option key={index} value={(index + 1).toString()}>
                      {index + 1}
                    </Option>
                  ))}
                </AntdSelect>
              </div>
            </div>
          </div>
        )}
        <button disabled={data.countInStock === 0} onClick={addtoCartHandler}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductModules;
