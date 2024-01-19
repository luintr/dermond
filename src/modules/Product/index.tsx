'use client';

import React, { useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { Select as AntdSelect, Radio, RadioChangeEvent } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

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
  const { Option } = AntdSelect;

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

  const [qty, setQty] = useState<number>(1);
  const [sizeModel, setSizeModel] = useState<'S' | 'M' | 'L'>(size);
  const [colorModel, setColorModel] = useState<
    'be' | 'brown' | 'black' | 'white'
  >(color);

  const addtoCartHandler = () => {
    dispatch(addToCart({ ...data, qty, size: sizeModel, color: colorModel }));
    router.push('/cart');
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSizeModel(e.target.value);
  };
  const handleColorChange = (e: RadioChangeEvent) => {
    setColorModel(e.target.value);
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
        <div>color: {color}</div>
        <div>
          <Radio.Group value={sizeModel} onChange={handleSizeChange}>
            <Radio.Button value="S">S</Radio.Button>
            <Radio.Button value="M">M</Radio.Button>
            <Radio.Button value="L">L</Radio.Button>
          </Radio.Group>
        </div>

        <div>
          <Radio.Group value={colorModel} onChange={handleColorChange}>
            <Radio.Button value="be">Be</Radio.Button>
            <Radio.Button value="brown">Brown</Radio.Button>
            <Radio.Button value="black">Black</Radio.Button>
            <Radio.Button value="white">White</Radio.Button>
          </Radio.Group>
        </div>

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
