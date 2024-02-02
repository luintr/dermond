'use client';

import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, Radio, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { paymentMethod } from '@/constants/method';
import {
  clearCartItems,
  savePaymentMethod,
  saveShippingAddress,
} from '@/store/slices/cartSlice';
import { createOrder } from '@/api/orderAPI';
import LinkEffect from '@/components/LinkEffect';

const PaymentModule = () => {
  const [value, setValue] = useState<string>('');
  const [dataStorage, setDataStorage] = useState<any | undefined>();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('userInfo');
      const localCart = localStorage.getItem('cart');
      const data = JSON.parse(localStorage.getItem('cart') || '{}');
      setDataStorage(data);
      if (!localUser || !localCart) {
        router.push('/login');
      }
    }
  }, [router]);

  const onChangeRadio = (e: any) => {
    setValue(e.target.value);
  };

  const onFinish = async (values: any) => {
    dispatch(saveShippingAddress(values));
    dispatch(savePaymentMethod(value));

    try {
      const res = await createOrder({
        orderItems: dataStorage.cartItems,
        shippingAddress: values,
        paymentMethod: value,
        itemsPrice: dataStorage.itemsPrice,
        taxPrice: dataStorage.taxPrice,
        shippingPrice: dataStorage.shippingPrice,
        totalPrice: dataStorage.totalPrice,
      });
      dispatch(clearCartItems());
      // @ts-ignore:next-line
      router.push(`order/${res._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${s.shipping} container grid grid-cols-12`}>
      <h1 className={`col-span-12`}>Shipping</h1>

      <div className={`${s.shippingForm} col-span-6`}>
        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="on"
          className={``}
        >
          <Form.Item
            label="Name"
            name="name"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="number"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your number!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your city!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Postal Code"
            name="postalCode"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your postal code!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            style={{
              width: '100%',
            }}
            rules={[
              {
                required: true,
                message: 'Please input your country!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Radio.Group onChange={onChangeRadio} value={value}>
            <Space direction="vertical">
              {paymentMethod.map((item, index) => (
                <Radio key={index} value={item.value}>
                  {item.title}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Place an order
            </Button>
          </Form.Item>
        </Form>
      </div>

      {dataStorage && (
        <div className={`col-span-6`}>
          {dataStorage.cartItems &&
            dataStorage.cartItems.map((item: any, index: number) => (
              <div key={index} className={s.orderItem}>
                <img src={item.image} alt={item.name} />
                <LinkEffect href={`/product/${item._id}`}>
                  {item.name}
                </LinkEffect>
                <div>color: {item.color}</div>
                <div>size: {item.size}</div>
                <p>
                  Price: ${item.price} X {item.qty}
                </p>
              </div>
            ))}
          <div className={s.sumary}>
            <p>Subtotal: ${dataStorage.itemsPrice}</p>
            <p>
              Shipping:{' '}
              {dataStorage.shippingPrice == 0
                ? 'Free ship'
                : dataStorage.shippingPrice}
            </p>
            <p>Tax: {dataStorage.taxPrice}</p>
            <p>Total: {dataStorage.totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModule;
