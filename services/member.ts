import callAPI from '../config/api';

// definisi route
const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VER = 'api/v1';

export async function getMemberOverview() {
  const url = `${ROOT_API}/${API_VER}/players/dashboard`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function getDetailTransactionHistory(id: string, serverToken: string) {
  const url = `${ROOT_API}/${API_VER}/players/history/${id}/detail`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
    serverToken,
  });
}

export async function updateProfile(data: FormData) {
  const url = `${ROOT_API}/${API_VER}/players/profile`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true,
  });
}

export async function getMemberTransactionHistory(valueParam: string) {
  let params = '';
  if (valueParam === 'all') {
    params = '';
  } else {
    params = `?status=${valueParam}`;
  }
  const url = `${ROOT_API}/${API_VER}/players/history${params}`;
  // pengembalian nilai
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
