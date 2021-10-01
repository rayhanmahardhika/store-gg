import axios from 'axios';

// definisi route
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VER = 'api/v1';

// service untuk post data sign-up ke API
export async function setSignUp(data: FormData) {
  const URL = 'auth/signup';
  // proses pemanggilan menggunakan AXIOS
  // karena ada callback berupa error maka kita harus catch promise error nya
  const res = await axios.post(`${ROOT_API}/${API_VER}/${URL}`, data).catch((err) => err.response);
  const axiosRes = res.data;
  if (axiosRes?.error === 1) {
    return axiosRes;
  }
  // pengembalian nilai
  return axiosRes.data;
}

export async function setLogin() {
  return null;
}
