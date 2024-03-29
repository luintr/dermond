import { createProduct, deleteProduct, getProduct } from '@/api/productAPI';
import { IProduct } from '@/types/global';
import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import s from '../style.module.scss';
import { IProductsQuery } from '@/modules/Shop/ProductList';

type IProductTable = {
  setProductID: (id: string) => void;
  setEditMode: (state: boolean) => void;
};

const ProductTable = ({ setProductID, setEditMode }: IProductTable) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [changeFlag, setChangeFlag] = useState<boolean>(false);
  const [queryParams, setQueryParams] = useState<IProductsQuery>({
    page: 1,
    limit: 5,
    sort: '',
    search: '',
  });

  useEffect(() => {
    getProduct(queryParams).then((res: any) => {
      setProducts(res.data);
      setTotalProduct(res.total);
    });
  }, [changeFlag, queryParams]);

  const deleteHandler = async (id: string | number) => {
    await deleteProduct(id);
    messageApi.open({
      type: 'success',
      content: 'Product Deleted',
      duration: 4,
    });
    setChangeFlag(!changeFlag);
  };

  const editHandler = (id: string) => {
    setEditMode(true);
    setProductID(id);
  };

  const createProductHandler = async () => {
    try {
      await createProduct();
      setChangeFlag(!changeFlag);
      messageApi.open({
        type: 'success',
        content: 'Product Created',
        duration: 4,
      });
      setTimeout(() => {
        setChangeFlag(!changeFlag);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
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
      width: '30%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => `$${text}`,
      width: '15%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: '15%',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: '15%',
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (text: string, record: IProduct) => (
        // @ts-ignore:next-line
        <button onClick={() => editHandler(record._id)}>Edit</button>
      ),
      width: '3%',
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (text: string, record: IProduct) => (
        // @ts-ignore:next-line
        <button onClick={() => deleteHandler(record._id)}>Delete</button>
      ),
      width: '3%',
    },
  ];
  return (
    <div className={` ${s.table} col-span-12 grid grid-cols-12`}>
      {contextHolder}
      <div className={`col-span-12 ${s.buttonCreate_wrapper}`}>
        <Button onClick={createProductHandler} className={s.buttonCreate_inner}>
          Create Product
        </Button>
      </div>
      <Table
        className={`col-span-12`}
        columns={columns}
        dataSource={[...products].reverse()}
        rowKey="_id"
        pagination={{
          pageSize: queryParams.limit,
          total: totalProduct,
          onChange: page => {
            setQueryParams({ ...queryParams, page: page });
          },
        }}
      />
    </div>
  );
};

export default ProductTable;
