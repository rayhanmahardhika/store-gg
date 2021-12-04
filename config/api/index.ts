import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}
export default async function callAPI({
  url, method, data, token, serverToken,
}: CallAPIProps) {
  let headers = {};
  // Cookies js tidak bisa dipanggil dalam fungsi server side props, 
  // sehingga harus dilakukan pengecekan saat call API
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    // proses pemanggilan menggunakan AXIOS
    // karena ada callback berupa error maka kita harus catch promise error nya
    const tokenCookies = Cookies.get('token');
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
  }
  const res = await axios({
    url,
    method,
    data,
    headers,
  }).catch((err) => err.response);

  if (res?.status > 300) {
    const response = {
      error: true,
      message: res.data.message,
      data: null,
    };
    return response;
  }
  const response = {
    error: false,
    message: 'success',
    data: res.data.data,
  };
  // pengembalian nilai
  return response;
}
