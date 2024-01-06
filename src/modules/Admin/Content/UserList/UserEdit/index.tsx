import { Button, Form, Input, Radio, RadioChangeEvent, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { IUserType } from '../UserTable';
import { getUserDetail, updateUser } from '@/api/userAPI';

type IUserEdit = {
  userID: string;
  setUserEditMode: (state: boolean) => void;
};

const AdminUserEdit = ({ userID, setUserEditMode }: IUserEdit) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [userDetail, setUserDetail] = useState<IUserType | null>(null);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [adminState, setAdminState] = useState<boolean>();

  const options = [
    {
      label: 'isAdmin',
      value: true,
    },
    {
      label: 'notAdmin',
      value: false,
    },
  ];

  useEffect(() => {
    getUserDetail(userID).then((res: any) => {
      setUserDetail(res);
      setAdminState(res.isAdmin);
    });
  }, []);

  const onRadioChange = ({ target: { value } }: RadioChangeEvent) => {
    setAdminState(value);
  };

  const onFinish = async (value: IUserType) => {
    const updatedUser = {
      _id: userDetail?._id,
      name: value.name,
      email: value.email,
      isAdmin: value.isAdmin,
    };

    try {
      setIsDisable(true);
      const result = await updateUser(updatedUser);
    } catch (error) {
      setIsDisable(false);
      throw new Error('Something went wrong');
    }

    messageApi.open({
      type: 'success',
      content: 'User Updated',
      duration: 4,
    });
    setTimeout(() => {
      setUserEditMode(false);
    }, 2000);
  };

  return (
    <div className={`col-span-12`}>
      {contextHolder}
      <div className={`col-span-12`}>
        <button onClick={() => setUserEditMode(false)}>Go Back</button>
      </div>
      {userDetail && (
        <Form
          name="basic"
          initialValues={{
            name: userDetail.name,
            email: userDetail.email,
            isAdmin: userDetail.isAdmin,
          }}
          onFinish={onFinish}
          className={`col-span-12`}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="isAdmin" label="setAdmin">
            <Radio.Group
              options={options}
              onChange={onRadioChange}
              value={adminState}
              optionType="button"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={isDisable && true}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AdminUserEdit;
