import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Profile() {
  const [user, setUser] = useState({
    avatar: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userPayload: UserTypes = payload.player;
      // const IMG = process.env.NEXT_PUBLIC_API_FILE;
      userPayload.avatar = `https://drive.google.com/uc?id=${userPayload.avatar}&export=download`;
      setUser(userPayload);
    }
  }, [setUser]);

  return (
    <div className="user text-center pb-50 pe-30">
      <img src={user.avatar} width="90" height="90" className="img-fluid mb-20" alt="profile" style={{ borderRadius: '100%', objectFit: 'cover' }} />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.name}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
