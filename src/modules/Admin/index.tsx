'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import AdminTabs from './Tabs';
import { tabData } from './data';

const AdminModule = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className={`${s.admin} container grid-cols-12`}>
      <h1 className={`col-span-12`}></h1>
      <AdminTabs setTab={setTab} />
      <div className={s.content}>{tabData[tab].content}</div>
    </div>
  );
};

export default AdminModule;
