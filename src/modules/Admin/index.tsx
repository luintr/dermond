'use client';

import React, { useState } from 'react';
import s from './style.module.scss';
import AdminTabs from './Tabs';
import { tabData } from './data';
import { Card, Divider, Flex } from 'antd';
import Search from 'antd/es/input/Search';

const AdminModule = () => {
  const [tab, setTab] = useState<number>(0);

  return (
    <div className={`${s.admin} container grid-cols-12`}>
      <div className={s.admin_wrapper}>
        <Flex justify="space-between">
          <AdminTabs currentTab={tabData[tab].name} setTab={setTab} />
        </Flex>
        <div className={s.content}>{tabData[tab].content}</div>
      </div>
    </div>
  );
};

export default AdminModule;
