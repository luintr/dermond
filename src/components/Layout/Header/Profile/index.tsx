import React, { useRef, useState } from 'react';
import s from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { removeUserStorage } from '@/store/slices/authSlice';
import { logout } from '@/api/userAPI';
import useClickOutside from '@/hooks/useClickOutside';
import { UserIcon } from '@/components/Icons';
import LinkEffect from '@/components/LinkEffect';
import { useRouter } from 'next/navigation';

const ProfileHeader = ({ data }: { data: any }) => {
  const [optionState, setOptionState] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { name, isAdmin } = data;
  // const { routerEffect } = useRouterEffect();
  const dispatch = useDispatch();

  const toggleOptionBox = () => {
    setOptionState(!optionState);
  };

  const hideOptions = () => {
    setOptionState(false);
  };

  const logoutHandler = async () => {
    await logout();
    dispatch(removeUserStorage());
    router.push('/login');
  };

  useClickOutside(ref, hideOptions);

  return (
    <div className={s.profile} ref={ref}>
      <div className={s.profileIcon} onClick={toggleOptionBox}>
        <UserIcon />
      </div>

      <ul className={`${s.profileOptions} ${optionState ? s.open : ''}`}>
        <li onClick={hideOptions}>
          <LinkEffect href={'/profile'} className={s.profileOptions_item}>
            <UserIcon />
            <span>{name}</span>
          </LinkEffect>
        </li>
        <li onClick={hideOptions}>
          <LinkEffect href={'/profile'} className={s.profileOptions_item}>
            Profile
          </LinkEffect>
        </li>
        {isAdmin ? (
          <li onClick={hideOptions}>
            <LinkEffect href={'/admin'} className={s.profileOptions_item}>
              Admin
            </LinkEffect>
          </li>
        ) : (
          ''
        )}

        <li onClick={hideOptions}>
          <span className={s.profileOptions_item} onClick={logoutHandler}>
            Log out
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
