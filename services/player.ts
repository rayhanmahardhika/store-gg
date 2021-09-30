import axios from 'axios';

// service untuk get API Featured game
export async function getFeaturedGames() {
  // definisi route
  const ROOT_API = process.env.NEXT_PUBLIC_API;
  const API_VER = 'api/v1';
  const URL = 'players/landingpage';
  // proses pemanggilan menggunakan AXIOS
  const res = await axios.get(`${ROOT_API}/${API_VER}/${URL}`);
  const axiosRes = res.data;
  // pengembalian nilai
  return axiosRes.data;
}

export async function getDetailVoucher() {
  return null;
}
