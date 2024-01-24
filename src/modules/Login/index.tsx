'use client';

import React, { useEffect } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { login } from '@/api/userAPI';
import Link from 'next/link';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import image from '@Images/singinImg.jpg';
import { Subtract } from '@/components/Icons';
import Marquee from 'react-fast-marquee';

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
      <div
        className={`${s.loginBox} col-span-10 col-start-2 grid grid-cols-10`}
      >
        <div className={`col-span-7 grid grid-cols-7`}>
          <div className={`${s.loginBox_top} col-span-7 col-start-1`}>
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
          <div className={`${s.loginBox_form} col-span-4 col-start-1`}>
            <h2 className={`${s.formTitle} ${cinzelFont.className}`}>
              Sign In
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
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input placeholder="Email" autoComplete="email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password
                  placeholder="Passwork"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
            <div className={s.loginBox_regis}>
              <p>Forgot your password?</p>
              <div className={s.wrapRegis}>
                <p>New Customer?</p>
                <Link
                  href={
                    redirect ? `register?redirect=${redirect}` : '/register'
                  }
                >
                  Register Now
                </Link>
              </div>
            </div>

            <div className={s.loginBox_googleLogin}>
              <div className={s.dashed}>
                <span></span>
                OR
                <span></span>
              </div>
              <button disabled>Login with Google</button>
            </div>
          </div>
          <div className={`${s.loginBox_text} col-span-2 col-start-6`}>
            <p>We embrace Beauty and</p>
            <p>Perfection</p>
          </div>
        </div>
        <div className={`${s.boxImage} col-span-3 col-start-8`}>
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
      </div>
    </div>
  );
};

export default LoginModule;
