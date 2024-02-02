'use client';
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Table, Tag, message } from 'antd';
import { profile } from '@/api/userAPI';
import { setCredentials } from '@/store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { getMyOrders } from '@/api/orderAPI';
import LinkEffect from '@/components/LinkEffect';
const ProfileModule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [orders, setOrders] = useState<any>(null);

  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getMyOrders().then((res: any) => {
      setOrders(res);
    });
  }, []);

  const onFinish = async (value: any) => {
    try {
      const res = await profile({
        _id: userInfo._id,
        name: value.name,
        email: value.email,
        password: value.password,
      });
      dispatch(setCredentials(res));
      messageApi.open({
        type: 'success',
        content: `Profile updated successfully. Go to homepage in ${5} seconds`,
        duration: 6,
      });
      router.push('/');
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 4,
      });
    }
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => {
        const shortenedString = text.substring(0, 15);
        return <LinkEffect href={`/order/${text}`}>{shortenedString}...</LinkEffect>;
      },
      width: '40%',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        const dateObject = new Date(text);
        return `${dateObject.getFullYear()}-${
          dateObject.getMonth() + 1
        }-${dateObject.getDate()}`;
      },
      width: '30%',
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text: string) => `$${text}`,
      width: '30%',
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid: boolean) => {
        if (isPaid) {
          return <Tag color={'green'}>Paid</Tag>;
        } else {
          return <Tag color={'volcano'}>Unpaid</Tag>;
        }
      },
      width: '30%',
    },
    {
      title: 'Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (isDelivered: boolean) => {
        if (isDelivered) {
          return <Tag color={'green'}>Delivered</Tag>;
        } else {
          return <Tag color={'volcano'}>Not Delivered</Tag>;
        }
      },
      width: '30%',
    },
  ];

  return (
    <div className={`${s.profile} container grid grid-cols-12`}>
      {contextHolder}
      <h1 className={`col-span-12`}>ProfileModule</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
          email: userInfo?.email,
          name: userInfo?.name,
        }}
        onFinish={onFinish}
        autoComplete="on"
        className={`col-span-5`}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input autoComplete="email" disabled={true} />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className={`col-span-7`}>
        <h2>Your Orders</h2>
        <Table columns={columns} dataSource={orders} rowKey="_id" />
      </div>
    </div>
  );
};

export default ProfileModule;
