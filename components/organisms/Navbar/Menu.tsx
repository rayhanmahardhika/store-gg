import cx from 'classnames'; // cx agar lebih pendek
import Link from 'next/link';

interface MenuProps{
    // props yang tidak wajib akan ditandai oleh ?, contoh"title?: string;"
    title: string;
    href: string;
    active?: boolean; // ini tidak wajib
}

// karena error jika tidak required
// maka digunakan parameter parsial
export default function Menu(props: Partial<MenuProps>) {
  const { title, active, href = '/' } = props;

  const classTitle = cx({
    'nav-link': true,
    active,
  });

  return (
    <li className="nav-item my-auto">
      <Link href={href}>
        <a className={classTitle} aria-current="page">{title}</a>
      </Link>
    </li>
  );
}
