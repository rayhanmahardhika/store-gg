import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Footer from './Footer';
import Menu from './Menu';
import Profile from './Profile';

interface SidebarProps {
  activeMenu: 'overview' | 'transactions' | 'messages' | 'card' | 'rewards' | 'settings'
}
export default function Sidebar(props: SidebarProps) {
  const { activeMenu } = props;

  const router = useRouter();

  const onLogOut = () => {
    Cookies.remove('token');
    router.push('/sign-in');
  };

  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <Menu title="Overview" icon="overview" active={activeMenu === 'overview'} href="/member" />
          <Menu title="Transactions" icon="transaction" active={activeMenu === 'transactions'} href="/member/transactions" />
          <Menu title="Messages" icon="messages" href="/member" />
          <Menu title="Card" icon="card" href="/member" />
          <Menu title="Rewards" icon="rewards" href="/member" />
          <Menu title="Settings" icon="settings" active={activeMenu === 'settings'} href="/member/edit-profile" />
          <Menu title="Log Out" icon="logout" onClick={onLogOut} />
        </div>
        <Footer />
      </div>
    </section>
  );
}
