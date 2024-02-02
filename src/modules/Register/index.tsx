'use client';

import React, { useEffect } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter, useSearchParams } from 'next/navigation';
import { setCredentials } from '@/store/slices/authSlice';
import { register } from '@/api/userAPI';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import image from '@Images/regisImg.jpg';
import { Subtract } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';

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
      <div
        className={`${s.regisBox} col-span-10 col-start-2 grid grid-cols-10`}
      >
        <div className={`${s.boxImage} col-span-3 col-start-1`}>
          <div className={`${s.boxImage_img}`}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt="image"
            />

            <div className={s.boxImage_logo}>
              <Subtract />
            </div>

            <div className={s.boxImage_maquee}>
              {/* <Marquee speed={10} gradient={false} direction="up"> */}
              <p className={`${cinzelFont.className}`}>DER MOND</p>
              {/* </Marquee> */}
            </div>
          </div>
        </div>
        <div className={`${s.wrapBox} col-span-7 col-start-4 grid grid-cols-7`}>
          <div className={`${s.regisBox_top} col-span-7 col-start-1`}>
            <div className={`${s.topContent_left}`}>
              <p>TAILOR SHOP BASED IN VIETNAM</p>
              <p>ETS 2019</p>
            </div>
            <div className={`${s.topContent_middle} ${cinzelFont.className}`}>
              <p>DERMOND</p>
            </div>
            <div className={`${s.topContent_right}`}>
              <p>INSTAGRAM</p>
              <p>@DERMOND.VN</p>
            </div>
          </div>
          <div className={`${s.regisBox_form} col-span-4 col-start-1`}>
            <h2 className={`${s.formTitle} ${cinzelFont.className}`}>
              Sign Up
            </h2>
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
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
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
                <Input autoComplete="email" placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password
                  autoComplete="new-password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                name="confirm"
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
                        new Error(
                          'The new password that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
            <div className={s.regisBox_login}>
              <p>Already have account?</p>
              <LinkEffect href={redirect ? `login?redirect=${redirect}` : '/login'}>
                Sign In
              </LinkEffect>
            </div>
          </div>
          <div className={`${s.regisBox_text} col-span-2 col-start-6`}>
            <p>We embrace Beauty and</p>
            <p>Perfection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModule;
