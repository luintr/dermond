import React, { useRef, useState } from 'react';
import s from './styles.module.scss';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeUserStorage } from '@/store/slices/authSlice';
import { logout } from '@/api/userAPI';
import useClickOutside from '@/hooks/useClickOutside';
import { UserIcon } from '@/components/Icons';

const ProfileHeader = ({ data }: { data: any }) => {
  const [optionState, setOptionState] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const { name, isAdmin } = data;

  const dispatch = useDispatch();
  const router = useRouter();

  const toggleOptionBox = () => {
    setOptionState(!optionState);
  };

  const hideOptions = () => {
    setOptionState(false);
  };

  const logoutHandler = async () => {
    try {
      // @ts-ignore:next-line
      const res = await logout();
      // @ts-ignore:next-line
      dispatch(removeUserStorage());
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useClickOutside(ref, hideOptions);

  return (
    <div className={s.profile} ref={ref}>
      <div className={s.profileIcon} onClick={toggleOptionBox}>
        <UserIcon />
      </div>

      <ul className={`${s.profileOptions} ${optionState ? s.open : ''}`}>
        <li onClick={hideOptions}>
          <Link href={'/profile'} className={s.profileOptions_item}>
            {name}
          </Link>
        </li>
        <li onClick={hideOptions}>
          <Link href={'/profile'} className={s.profileOptions_item}>
            Profile
          </Link>
        </li>
        {isAdmin ? (
          <li onClick={hideOptions}>
            <Link href={'/admin'} className={s.profileOptions_item}>
              Admin
            </Link>
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
