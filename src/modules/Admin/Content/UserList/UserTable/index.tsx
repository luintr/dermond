import { deleteUser, getUsers } from '@/api/userAPI';
import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react';

type IUserTable = {
  setUserID: (id: string) => void;
  setUserEditMode: (state: boolean) => void;
};

export type IUserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const AdminUserTable = ({ setUserID, setUserEditMode }: IUserTable) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [users, setUsers] = useState();
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  useEffect(() => {
    getUsers().then((res: any) => {
      setUsers(res);
    });
  }, [changeFlag]);

  const editHandler = (id: string) => {
    setUserEditMode(true);
    setUserID(id);
  };

  const deleteHandler = async (id: string) => {
    await deleteUser(id);
    messageApi.open({
      type: 'success',
      content: 'Product Deleted',
      duration: 4,
    });
    setChangeFlag(!changeFlag);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
      render: (text: string) => {
        const shortenedString = text.substring(0, 15);
        return `${shortenedString}...`;
      },
      width: '20%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
    },
    {
      title: 'isAdmin',
      dataIndex: 'isAdmin',
      key: 'isAdmin',
      render: (state: boolean) => `${state}`,
      width: '15%',
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (text: string, record: IUserType) => (
        // @ts-ignore:next-line
        <button onClick={() => editHandler(record._id)}>Edit</button>
      ),
      width: '3%',
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (text: string, record: IUserType) => (
        // @ts-ignore:next-line
        <button onClick={() => deleteHandler(record._id)}>Delete</button>
      ),
      width: '3%',
    },
  ];

  return (
    <div className={`col-span-12 grid grid-cols-12`}>
      {contextHolder}
      <Table
        className={`col-span-12`}
        columns={columns}
        dataSource={users}
        rowKey="_id"
      />
    </div>
  );
};

export default AdminUserTable;
