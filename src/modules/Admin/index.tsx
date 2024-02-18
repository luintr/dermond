'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import AdminTabs from './Tabs';
import { tabData } from './data';
import { cinzelFont } from '@/utils/fonts';

const AdminModule = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className={`${s.admin} container`}>
      <h2 className={`${s.admin_title} ${cinzelFont.className}`}>
        Admin DashBoard
      </h2>
      <div className={`${s.admin_wrapper} `}>
        <AdminTabs currentTab={tabData[tab].name} setTab={setTab} />
        <div className={s.content}>{tabData[tab].content}</div>
      </div>
    </div>
  );
};

export default AdminModule;
