'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import AdminUserTable from './UserTable';
import AdminUserEdit from './UserEdit';

const AdminUserList = () => {
  const [userEditMode, setUserEditMode] = useState<boolean>(false);
  const [userID, setUserID] = useState<string>('');

  return (
    <div className={s.admin_userList}>
      {userEditMode ? (
        <AdminUserEdit userID={userID} setUserEditMode={setUserEditMode} />
      ) : (
        <AdminUserTable
          setUserEditMode={setUserEditMode}
          setUserID={setUserID}
        />
      )}
    </div>
  );
};

export default AdminUserList;
