import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TopUpCategoryTypes, TransactionHistoryTypes } from '../../../services/data-types';
import { getMemberOverview } from '../../../services/member';
import Category from './Category';
import TableRow from './TableRow';

export default function OverviewContent() {
  const [count, setCount] = useState([]);
  const [history, setHistory] = useState([]);

  const IMG = process.env.NEXT_PUBLIC_API_FILE;

  const getMemberOverviewAPI = useCallback(async () => {
    const res = await getMemberOverview();
    if (res.error) {
      toast.error(res.message);
    } else {
      setCount(res.data.count);
      setHistory(res.data.history);
    }
  }, [getMemberOverview]);

  useEffect(() => {
    getMemberOverviewAPI();
  }, [getMemberOverviewAPI]);
  return (
    <main className="main-wrapper">
      <div className="ps-lg-0">
        <h2 className="text-4xl fw-bold color-palette-1 mb-30">Overview</h2>
        <div className="top-up-categories mb-30">
          <p className="text-lg fw-medium color-palette-1 mb-14">Top Up Categories</p>
          <div className="main-content">
            <div className="row">
              {count.map((item: TopUpCategoryTypes) => (
                <Category
                  key={item._id}
                  amount={item.value}
                  icon={item.name}
                >
                  Game
                  <br />
                  {item.name}
                </Category>
              ))}
            </div>
          </div>
        </div>
        <div className="latest-transaction">
          <p className="text-lg fw-medium color-palette-1 mb-14">Latest Transactions</p>
          <div className="main-content main-content-table overflow-auto">
            <table className="table table-borderless">
              <thead>
                <tr className="color-palette-1">
                  <th className="text-start" scope="col">Game</th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item: TransactionHistoryTypes) => (
                  <TableRow
                    key={item._id}
                    image={`${IMG}/${item.voucherTopupHistory.thumbnail}`}
                    title={item.voucherTopupHistory.gameName}
                    category={item.voucherTopupHistory.category}
                    item={`${item.voucherTopupHistory.coinQuantity} ${item.voucherTopupHistory.coinName}`}
                    price={item.value}
                    status={item.status}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
