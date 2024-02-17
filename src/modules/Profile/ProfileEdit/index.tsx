import React from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useRouterEffect from '@/hooks/useRouterEffect';
import { setCredentials } from '@/store/slices/authSlice';
import { profile } from '@/api/userAPI';
import s from '../styles.module.scss';
import { cinzelFont } from '@/utils/fonts';

type IProfileEdit = {
  messageApi: any;
};

const ProfileEdit: React.FC<IProfileEdit> = ({ messageApi }) => {
  // @ts-ignore:next-line
  const { userInfo } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { routerEffect } = useRouterEffect();

  const onFinish = async (value: any) => {
    try {
      messageApi.open({
        type: 'success',
        content: `Profile updated successfully.`,
        duration: 1.5,
      });

      const res = await profile({
        _id: userInfo._id,
        name: value.name,
        email: value.email,
        password: value.password,
      });
      dispatch(setCredentials(res));
      await routerEffect('/');
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
        duration: 4,
      });
    }
  };

  return (
    <div className={`${s.editProfile} col-span-5`}>
      <h2 className={`${s.editProfile_title} ${cinzelFont.className}`}>
        Edit Profile
      </h2>

      <Form
        name="basic"
        initialValues={{
          remember: true,
          email: userInfo?.email,
          name: userInfo?.name,
        }}
        onFinish={onFinish}
        autoComplete="on"
      >
        <Form.Item
          name="email"
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

        <Form.Item name="name">
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item name="password" hasFeedback>
          <Input.Password autoComplete="new-password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
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
          <Input.Password
            autoComplete="new-password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileEdit;
