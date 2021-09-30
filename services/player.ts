import axios from 'axios';

// definisi route
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VER = 'api/v1';

// service untuk get API Featured game
export async function getFeaturedGames() {
  const URL = 'players/landingpage';
  // proses pemanggilan menggunakan AXIOS
  const res = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
  const axiosRes = res.data;
  // pengembalian nilai
  return axiosRes.data;
}

// service untuk get API Detail Voucher Game
export async function getDetailVoucher(id) {
  const URL = `players/${id}/detail`;
  // proses pemanggilan menggunakan AXIOS
  const res = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
  const axiosRes = res.data;
  // pengembalian nilai
  return axiosRes.data;
}
