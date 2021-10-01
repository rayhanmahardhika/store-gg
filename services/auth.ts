import callAPI from '../config/api';
import { LoginTypes } from './data-types';

// definisi route
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VER = 'api/v1';

// service untuk post data sign-up ke API
export async function setSignUp(data: FormData) {
  const url = `${ROOT_API}/${API_VER}/auth/signup`;

  // pengembalian nilai
  return callAPI({
    url,
    method: 'POST',
    data,
  });
}

export async function setLogin(data: LoginTypes) {
  const url = `${ROOT_API}/${API_VER}/auth/signin`;

  // pengembalian nilai
  return callAPI({
    url,
    method: 'POST',
    data,
  });
}
