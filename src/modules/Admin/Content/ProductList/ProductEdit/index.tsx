import { getProductDetail, updateProduct } from '@/api/productAPI';
import {
  Button,
  Form,
  Input,
  InputNumber,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';

type IProductEdit = {
  productID: string;
  setEditMode: (state: boolean) => void;
};

type IDetail = {
  _id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
};

const ProductEdit = ({ productID, setEditMode }: IProductEdit) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [detail, setDetail] = useState<IDetail | null>(null);
  const [imageFile, setImageFile] = useState<RcFile | undefined>(undefined);
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [haveUpload, setHaveUpload] = useState<boolean>(false);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    if (newFileList[0]) {
      setImageFile(newFileList[0].originFileObj);
      setHaveUpload(true);
    }
    setFileList(newFileList);
  };

  useEffect(() => {
    getProductDetail(productID).then((res: any) => {
      setDetail(res.data);
      setFileList([
        {
          uid: res.data._id,
          name: res.data.name,
          status: 'done',
          url: res.data.image,
        },
      ]);
    });
  }, [productID]);

  const uploadImage = async () => {
    if (imageFile) {
      const formData = new FormData();

      formData.append('file', imageFile);
      formData.append('upload_preset', 'dermond');

      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then(res => res.json());

      return data.secure_url;
    }
  };

  const onFinish = async (value: IDetail) => {
    if (fileList) {
      const image = haveUpload ? await uploadImage() : fileList[0].url;

      const updatedProduct = {
        _id: detail?._id,
        name: value.name,
        price: value.price,
        image: image,
        brand: value.brand,
        category: value.category,
        countInStock: value.countInStock,
        description: value.description,
      };

      try {
        setIsDisable(true);
        const result = await updateProduct(updatedProduct);
      } catch (error) {
        setIsDisable(false);
        throw new Error('Something went wrong');
      }
      setHaveUpload(false);
      messageApi.open({
        type: 'success',
        content: 'Product Updated',
        duration: 4,
      });
      setTimeout(() => {
        setEditMode(false);
      }, 2000);
    }
  };

  return (
    <div className={`col-span-12`}>
      {contextHolder}
      <div className={`col-span-12`}>
        <button onClick={() => setEditMode(false)}>Go Back</button>
      </div>
      {detail && (
        <Form
          name="basic"
          initialValues={{
            name: detail.name,
            price: detail.price,
            image: detail.image,
            brand: detail.brand,
            category: detail.category,
            countInStock: detail.countInStock,
            description: detail.description,
          }}
          onFinish={onFinish}
          className={`col-span-12`}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>

          <Form.Item name="price" label="Price">
            <InputNumber />
          </Form.Item>

          <Form.Item name="image" label="Image">
            <ImgCrop rotationSlider>
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
              >
                {fileList && fileList.length < 1 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>

          <Form.Item name="brand" label="Brand">
            <Input />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>

          <Form.Item name="countInStock" label="Count In Stock">
            <InputNumber />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea data-lenis-prevent />
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

export default ProductEdit;
