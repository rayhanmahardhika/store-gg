/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cx from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

interface MenuProps {
    title: string;
    icon: 'overview' | 'transaction' | 'messages' | 'card' | 'rewards' | 'settings' | 'logout';
    href?: string;
    active?: boolean;
    onClick?: () => void;
}
export default function Menu(props: Partial<MenuProps>) {
  const {
    title, icon, active, href = '/',
    onClick,
  } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });
  return (
    <div className={classItem} onClick={onClick}>
      <div className="me-3">
        <Image src={`/icon/sidebar-${icon}.svg`} width={25} height={25} />
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <a className="text-lg text-decoration-none">{title}</a>
        ) : (
          <Link href={href}>
            <a className="text-lg text-decoration-none">{title}</a>
          </Link>
        )}
      </p>
    </div>
  );
}
