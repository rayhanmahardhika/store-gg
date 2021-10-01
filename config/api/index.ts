import axios, { AxiosRequestConfig } from 'axios';

export default async function callAPI({ url, method, data }: AxiosRequestConfig) {
  // proses pemanggilan menggunakan AXIOS
  // karena ada callback berupa error maka kita harus catch promise error nya
  const res = await axios({
    url,
    method,
    data,
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
