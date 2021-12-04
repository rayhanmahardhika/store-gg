import callAPI from '../config/api';
import { CheckoutTypes } from './data-types';

// definisi route
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VER = 'api/v1';

// service untuk get API Featured game
export async function getFeaturedGames() {
  const url = `${ROOT_API}/${API_VER}/players/landingpage`;

  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
  });
}

// service untuk get API Detail Voucher Game
export async function getDetailVoucher(id: string) {
  const url = `${ROOT_API}/${API_VER}/players/${id}/detail`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getGameCategory() {
  const url = `${ROOT_API}/${API_VER}/players/category`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
  });
}

export async function setCheckout(data: CheckoutTypes) {
  const url = `${ROOT_API}/${API_VER}/players/checkout`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}
