import React, { useState } from 'react';
import s from './style.module.scss';
import ProductTable from './ProductTable';
import ProductEdit from './ProductEdit';

const AdminProductList = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [productID, setProductID] = useState<string>('');
  return (
    <div className={`${s.admin_productList} grid grid-cols-12`}>
      <div className={`col-span-12`}>Admin Product List</div>
      {!editMode ? (
        <ProductTable setProductID={setProductID} setEditMode={setEditMode}/>
      ) : (
        <ProductEdit productID={productID} setEditMode={setEditMode}/>
      )}
    </div>
  );
};

export default AdminProductList;
