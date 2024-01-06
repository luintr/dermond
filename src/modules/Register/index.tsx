'use client';

import React, { useEffect } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter, useSearchParams } from 'next/navigation';
import { setCredentials } from '@/store/slices/authSlice';
import { register } from '@/api/userAPI';

const RegisterModule = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const pathName = useSearchParams();
  const redirect = pathName.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [redirect, userInfo, router]);

  const onFinish = async (values: any) => {
    try {
      const res = await register(values);
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
    <div className={`${s.register} container grid grid-cols-12`}>
      {contextHolder}
      <h1>Sign Up</h1>
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
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input autoComplete="email"/>
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password autoComplete="new-password"/>
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
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
          <Input.Password autoComplete="new-password"/>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <p>
       Already have account?{' '}
        <Link href={redirect ? `login?redirect=${redirect}` : '/login'}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterModule;
