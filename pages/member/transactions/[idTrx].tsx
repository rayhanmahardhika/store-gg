import jwtDecode from 'jwt-decode';
import TransactionDetailContent from '../../../components/organisms/TransactionDetailContent';
import { JWTPayloadTypes, TransactionHistoryTypes, UserTypes } from '../../../services/data-types';
import { getDetailTransactionHistory } from '../../../services/member';

interface TransactionDetailProps {
  transactionDetail: TransactionHistoryTypes;
}
export default function TransactionsDetail(props: TransactionDetailProps) {
  const { transactionDetail } = props;
  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    }
  },
  params: {
    idTrx: string;
  }
}

// akses server side sebagai middleware (kelebihan next js)
export async function getServerSideProps({ req, params }: GetServerSideProps) {
  const { idTrx } = params;
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

  const res = await getDetailTransactionHistory(idTrx, jwtToken);

  return {
    props: {
      transactionDetail: res.data,
    },
  };
}
