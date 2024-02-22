'use client';

import React, { useEffect, useRef } from 'react';
import s from './style.module.scss';
import { Button, Form, Input, message } from 'antd';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import { login } from '@/api/userAPI';
import { cinzelFont } from '@/utils/fonts';
import Image from 'next/image';
import image from '@Images/singinImg.jpg';
import { Subtract } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';
import Fade from '@/components/Fade';
import { marqueeItems } from '@/constants/utils';
import useMarquee from '@/hooks/useMarquee';
import useRouterEffect from '@/hooks/useRouterEffect';
import gsap from 'gsap';
import useUiContext from '@/context/uiContext';

const LoginModule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const wrapImageRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const { isPageEnter } = useUiContext();
  const dispatch = useDispatch();
  const { routerEffect } = useRouterEffect();

  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  const pathName = useSearchParams();
  const redirect = pathName.get('redirect') || '/';

  const marqueeInner = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (userInfo) {
      routerEffect(redirect);
    }
  }, [redirect, userInfo]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isPageEnter) {
        gsap.to(imageRef.current, {
          scale: 1,
          duration: 1,
          ease: 'power4.out',
        });
        gsap.to(wrapImageRef.current, {
          clipPath: 'inset(0 0 0 0%)',
          duration: 1,
          ease: 'power4.out',
        });
      }
    });
    return () => ctx.clear();
  }, [wrapImageRef, isPageEnter]);

  const onFinish = async (values: any) => {
    try {
      const res = await login(values);
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

  const { marqueePartRefs } = useMarquee({ marqueeInner });

  return (
    <div className={`${s.login} container grid grid-cols-12`}>
      {contextHolder}
      <div
        className={`${s.loginBox} col-span-10 col-start-2 grid grid-cols-10`}
      >
        <div className={`col-span-7 grid grid-cols-7`}>
          <div className={`${s.loginBox_top} col-span-7 col-start-1`}>
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
          <div className={`${s.loginBox_form} col-span-4 col-start-1`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <h2 className={`${s.formTitle} ${cinzelFont.className}`}>
                Sign In
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
              </div>
            </Fade>
            <div className={s.loginBox_regis}>
              <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                <p>Forgot your password?</p>
              </Fade>
              <div className={s.wrapRegis}>
                <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                  <p>New Customer?</p>
                </Fade>
                <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
                  <LinkEffect
                    href={
                      redirect ? `register?redirect=${redirect}` : '/register'
                    }
                  >
                    Register Now
                  </LinkEffect>
                </Fade>
              </div>
            </div>

            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <div className={s.loginBox_googleLogin}>
                <div className={s.dashed}>
                  <span></span>
                  OR
                  <span></span>
                </div>
                <button disabled>Login with Google</button>
              </div>
            </Fade>
          </div>
          <div className={`${s.loginBox_text} col-span-2 col-start-6`}>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.2}>
              <p>We embrace Beauty and</p>
            </Fade>
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.4}>
              <p>Perfection</p>
            </Fade>
          </div>
        </div>
        <div className={`${s.boxImage} col-span-3 col-start-8`}>
          <div className={`${s.boxImage_img}`} ref={wrapImageRef}>
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt="image"
              ref={imageRef}
            />
            <Fade direction={'bottom'} from={'30px'} delayEnter={0.7}>
              <div className={s.boxImage_logo}>
                <Subtract />
              </div>
            </Fade>
            <Fade direction={'right'} from={'30px'} delayEnter={0.4}>
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
      </div>
    </div>
  );
};

export default LoginModule;
