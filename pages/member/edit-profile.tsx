import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import TextField from '../../components/atoms/TextField';
import Sidebar from '../../components/organisms/Sidebar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

interface UserStateType {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  avatar: any;
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateType>({
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    avatar: '',
  });

  const [imgPrev, setImgPrev] = useState('/');
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userPayload: UserTypes = payload.player;
      userPayload.avatar = `https://drive.google.com/uc?id=${userPayload.avatar}`;
      setUser(userPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();
    data.append('name', user.name);
    data.append('phoneNumber', user.phoneNumber);
    data.append('image', user.avatar);
    const res = await updateProfile(data);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success('Berhasil Update Profil! 😁');
      Cookies.remove('tooken');
      router.push('/sign-in');
    }
  };

  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imgPrev === '/' ? (
                      <img
                        src={user.avatar}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <img
                        src={imgPrev}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImgPrev(URL.createObjectURL(img));
                      return setUser({ ...user, avatar: img });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <TextField label="Full Name" value={user.name} onChange={(event) => setUser({ ...user, name: event.target.value })} />
              </div>
              <div className="pt-30">
                <TextField
                  label="Email
                  Address"
                  value={user.email}
                  disabled
                />
              </div>
              <div className="pt-30">
                <TextField label="Phone" value={user.phoneNumber} onChange={(event) => setUser({ ...user, phoneNumber: event.target.value })} />
              </div>
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile

                </button>
              </div>
            </form>

          </div>

        </div>
      </main>
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    }
  }
}

// akses server side sebagai middleware (kelebihan next js)
export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: '/sign-in',
        permanent: false,
      },
    };
  }

  // fungsi AtoB yang ada pada client side (karena AtoB hanya ada di client side)
  const jwtToken = Buffer.from(token, 'base64').toString('ascii');
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  const user: UserTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_API_FILE;
  user.avatar = `${IMG}/${user.avatar}`;

  return {
    props: {
      user,
    },
  };
}
