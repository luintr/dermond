import { Button } from 'antd';
import s from './style.module.scss';
import { TypographyBody } from '@/components/Typography';
import LinkEffect from '@/components/LinkEffect';
import { ROUTE_PATH } from '@/constants/route';

interface DrawerNavProps {
  isOpen: boolean;
  onOpenNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DrawerNav({
  isOpen,
  onOpenNav,
}: DrawerNavProps): React.ReactElement {
  return (
    <nav className={`${s.mobileNav} ${isOpen ? s.open : ''}`}>
      <div className={s.mobileNav_nav}>
        <div onClick={() => onOpenNav(false)}>
          <LinkEffect href={ROUTE_PATH.STORY} className={s.mobileNav_item}>
            OUR STORY
          </LinkEffect>
        </div>
        <div onClick={() => onOpenNav(false)}>
          <LinkEffect href={ROUTE_PATH.SHOP} className={s.mobileNav_item}>
            SHOP
          </LinkEffect>
        </div>
      </div>
    </nav>
  );
}
