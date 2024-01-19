'use client';

import React, { useEffect } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { login } from '@/api/userAPI';
import Link from 'next/link';

const LoginModule = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const router = useRouter();

  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  const pathName = useSearchParams();
  const redirect = pathName.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [redirect, userInfo, router]);

  const onFinish = async (values: any) => {
    try {
      const res = await login(values);
      dispatch(setCredentials(res));
      router.push(redirect);
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 4,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    messageApi.open({
      type: 'error',
      content: 'Please enter your email and password',
      duration: 4,
    });
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={`${s.login} container grid grid-cols-12`}>
      {contextHolder}
      <h1>Sign In</h1>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        className={`col-span-12`}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>
        New Customer?{' '}
        <Link href={redirect ? `register?redirect=${redirect}` : '/register'}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginModule;
