import Footer from './Footer';
import Menu from './Menu';
import Profile from './Profile';

export default function Sidebar() {
  return (
    <section className="sidebar">
      <div className="content pt-50 pb-30 ps-30">
        <Profile />
        <div className="menus">
          <Menu title="Overview" icon="overview" active />
          <Menu title="Transactions" icon="transaction" />
          <Menu title="Messages" icon="messages" />
          <Menu title="Card" icon="card" />
          <Menu title="Rewards" icon="rewards" />
          <Menu title="Settings" icon="settings" />
          <Menu title="Log Out" icon="logout" />
        </div>
        <Footer />
      </div>
    </section>
  );
}
