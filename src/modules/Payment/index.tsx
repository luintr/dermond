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
import { cinzelFont } from '@/utils/fonts';

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
      <div className={`${s.shippingForm} col-span-6 col-start-2`}>
        <h1 className={`${s.shipping_title} ${cinzelFont.className}`}>
          Shipping
        </h1>
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
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input your number!',
              },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input your address!',
              },
            ]}
          >
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: 'Please input your city!',
              },
            ]}
          >
            <Input placeholder="City" />
          </Form.Item>

          <Form.Item
            name="postalCode"
            rules={[
              {
                required: true,
                message: 'Please input your postal code!',
              },
            ]}
          >
            <Input placeholder="Postal Code" />
          </Form.Item>

          <Form.Item
            name="country"
            rules={[
              {
                required: true,
                message: 'Please input your country!',
              },
            ]}
          >
            <Input placeholder="Country" />
          </Form.Item>

          <Radio.Group
            onChange={onChangeRadio}
            value={value}
            className={s.shippingForm_radio}
          >
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
        <div className={`${s.billInfo} col-span-5`}>
          <p className={s.text}>
            <span className={cinzelFont.className}>Summary</span>
            <span className={s.textDash}></span>
          </p>
          <div className={s.billInfo_list}>
            {dataStorage.cartItems &&
              dataStorage.cartItems.map((item: any, index: number) => (
                <div key={index} className={s.orderItem}>
                  <div className={s.orderItem_img}>
                    <img src={item.image} alt={item.name} className={s.img} />
                    <LinkEffect
                      href={`/product/${item._id}`}
                      className={`${s.title} ${cinzelFont.className}`}
                    >
                      {item.name}
                    </LinkEffect>
                  </div>
                  <div className={s.orderItem_info}>
                    <div className={s.wrap}>
                      <p>
                        Color: <span>{item.color}</span>
                      </p>
                      <p>
                        Size: <span>{item.size}</span>
                      </p>
                    </div>
                    <p>
                      Quatity: <span>{item.qty}</span>
                    </p>
                    <p>
                      Price: <span>${item.price * item.qty}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <div className={s.billInfo_summary}>
            <div className={s.dash}></div>
            <p>
              <span>Product Total ({dataStorage.cartItems.length})</span>
              <span>${dataStorage.itemsPrice}</span>
            </p>
            <p>
              <span>Shipping</span>
              <span>
                {dataStorage.shippingPrice == 0
                  ? 'Free ship'
                  : dataStorage.shippingPrice}
              </span>
            </p>
            <p>
              <span>Tax</span>
              <span>{dataStorage.taxPrice}</span>
            </p>

            <div className={s.total}>
              <p className={s.text}>
                <span className={cinzelFont.className}>Total</span>
                <span className={s.textDash}></span>
              </p>
              <p className={s.price}>${dataStorage.totalPrice}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentModule;
