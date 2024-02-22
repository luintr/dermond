'use client';

import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { useSearchParams } from 'next/navigation';
import { setCredentials } from '@/store/slices/authSlice';
import { register } from '@/api/userAPI';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import image from '@Images/regisImg.jpg';
import { Subtract } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';
import Fade from '@/components/Fade';
import useRouterEffect from '@/hooks/useRouterEffect';
import { marqueeItems } from '@/constants/utils';
import useMarquee from '@/hooks/useMarquee';
import gsap from 'gsap';
import useUiContext from '@/context/uiContext';

const RegisterModule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const imageRef = useRef<HTMLDivElement | null>(null);
  const { isPageEnter } = useUiContext();
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { routerEffect } = useRouterEffect();

  const pathName = useSearchParams();
  const redirect = pathName.get('redirect') || '/';

  const marqueeInner = useRef<HTMLDivElement | null>(null);
  const { marqueePartRefs } = useMarquee({ marqueeInner });

  useEffect(() => {
    if (userInfo) {
      routerEffect(redirect);
    }
  }, [redirect, userInfo]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      isPageEnter &&
        gsap.to(imageRef.current, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          ease: 'power4.out',
        });
    });
    return () => ctx.clear();
  }, [imageRef, isPageEnter]);
  const onFinish = async (values: any) => {
    try {
      const res = await register(values);
      dispatch(setCredentials(res));
      routerEffect(redirect);
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
          <div className={`${s.boxImage_img}`} ref={imageRef}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt="image"
            />
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.7}>
              <div className={s.boxImage_logo}>
                <Subtract />
              </div>
            </Fade>
            <Fade direction={'left'} from={'30px'} delayEnter={0.4}>
              <div ref={marqueeInner} className={s.boxImage_maquee}>
                {marqueeItems.map((project, index) => {
                  return (
                    <span
                      ref={marqueePartRefs[index]}
                      key={index}
                      className={`${cinzelFont.className}`}
                    >
                      {project.content}
                    </span>
                  );
                })}
              </div>
            </Fade>
          </div>
        </div>
        <div className={`${s.wrapBox} col-span-7 col-start-4 grid grid-cols-7`}>
          <div className={`${s.regisBox_top} col-span-7 col-start-1`}>
            <div className={`${s.topContent_left}`}>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
                <p>TAILOR SHOP BASED IN VIETNAM</p>
              </Fade>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                <p>ETS 2019</p>
              </Fade>
            </div>
            <div className={`${s.topContent_middle} ${cinzelFont.className}`}>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
                <p>DERMOND</p>
              </Fade>
            </div>
            <div className={`${s.topContent_right}`}>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
                <p>INSTAGRAM</p>
              </Fade>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                <p>@DERMOND.VN</p>
              </Fade>
            </div>
          </div>
          <div className={`${s.regisBox_form} col-span-4 col-start-1`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <h2 className={`${s.formTitle} ${cinzelFont.className}`}>
                Sign Up
              </h2>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.6}>
              <div className={`col-span-12`}>
                <Form
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="on"
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
              </div>
            </Fade>
            <div className={s.regisBox_login}>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                <p>Already have account?</p>
              </Fade>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                <LinkEffect
                  href={redirect ? `login?redirect=${redirect}` : '/login'}
                >
                  Sign In
                </LinkEffect>
              </Fade>
            </div>
          </div>
          <div className={`${s.regisBox_text} col-span-2 col-start-6`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
              <p>We embrace Beauty and</p>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p>Perfection</p>
            </Fade>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModule;
