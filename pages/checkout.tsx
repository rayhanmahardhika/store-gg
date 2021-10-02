import Image from 'next/image';
import jwtDecode from 'jwt-decode';
import CheckoutConfirmation from '../components/organisms/CheckoutConfirmation';
import CheckoutDetail from '../components/organisms/CheckoutDetail';
import CheckoutItem from '../components/organisms/CheckoutItem';
import { JWTPayloadTypes, UserTypes } from '../services/data-types';

interface CheckoutProps {
  user: UserTypes;
}

export default function Checkout(props: CheckoutProps) {
  const { user } = props;
  console.log(user);
  return (
    <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
      <div className="container-fluid">
        <div className="logo text-md-center text-start pb-50">
          <a className="" href="#">
            <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
          </a>
        </div>
        <div className="title-text pt-md-50 pt-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
          <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
        </div>
        <CheckoutItem />
        <hr />
        <CheckoutDetail />
        <CheckoutConfirmation />
      </div>
    </section>
  );
}

// akses server side sebagai middleware (kelebihan next js)
export async function getServerSideProps({ req }) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  // fungsi AtoB yang ada pada client side (karena AtoB hanya ada di client side)
  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const user: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_API_FILE;
  user.avatar = `${IMG}/${user.avatar}`;

  return {
    props: {
      user,
    },
  };
}
