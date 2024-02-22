import React from 'react';
import s from './style.module.scss';
import { tabData } from '../data';

type ITab = {
  currentTab: string;
  setTab: (tab: number) => void;
};

const AdminTabs = ({ currentTab, setTab }: ITab) => {
  const tabClickHandler = (id: number) => {
    setTab(id);
  };
  return (
    <div className={s.adminTabs}>
      {tabData.map(item => (
        <div
          className={`${s.adminTabs_item} ${currentTab === item.name && s.adminTabs_item__active}`}
          key={item.id}
          onClick={() => tabClickHandler(item.id)}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default AdminTabs;
