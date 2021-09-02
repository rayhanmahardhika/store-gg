import cx from 'classnames';
import Image from 'next/image';

interface MenuProps {
    title: string;
    icon: 'overview' | 'transaction' | 'messages' | 'card' | 'rewards' | 'settings' | 'logout';
    active?: boolean;
}
export default function Menu(props: Partial<MenuProps>) {
  const { title, icon, active } = props;
  const classItem = cx({
    item: true,
    'mb-30': true,
    active,
  });
  return (
    <div className={classItem}>
      <div className="me-3">
        <Image src={`/icon/sidebar-${icon}.svg`} width={25} height={25} />
      </div>
      <p className="item-title m-0">
        <a href="" className="text-lg text-decoration-none">{title}</a>
      </p>
    </div>
  );
}
