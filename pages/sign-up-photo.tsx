import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { setSignUp } from '../services/auth';
import { getGameCategory } from '../services/player';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPhoto() {
  const [categories, setCategories] = useState([]);
  const [favorite, setFavorite] = useState('');
  const [image, setImage] = useState('');
  const [imgPrev, setImgPrev] = useState('/icon/upload.svg');
  const [localData, setLocalData] = useState({
    name: '',
    email: '',
  });
  const router = useRouter();

  const getGameCategoryAPI = useCallback(async () => {
    const data = await getGameCategory();
    setCategories(data);
    setFavorite(data[0]._id);
  }, [getGameCategory]);

  useEffect(() => {
    getGameCategoryAPI();
  }, []);

  useEffect(() => {
    const getLocalData = localStorage.getItem('user-form');
    setLocalData(JSON.parse(getLocalData));
  }, []);

  const onSubmit = async () => {
    // ambil data dari local storage
    const getLocalData = await localStorage.getItem('user-form');
    const form = JSON.parse(getLocalData);
    // post data menggunakan bentuk FormData
    const data = new FormData();

    data.append('email', form.email);
    data.append('password', form.password);
    data.append('phoneNumber', '0812312311');
    data.append('username', form.name);
    data.append('name', form.name);
    data.append('favorite', favorite);
    data.append('image', image);
    data.append('role', 'user');
    data.append('status', 'Y');

    const result = await setSignUp(data);
    if (result?.error === 1) {
      toast.error(result.message);
    } else {
      toast.success('Register Berhasil! 😁');
      router.push('/sign-up-success');
      localStorage.removeItem('user-form');
    }
  };

  return (
    <section className="sign-up-photo mx-auto pt-lg-227 pb-lg-227 pt-130 pb-50">
      <div className="container mx-auto">
        <form action="">
          <div className="form-input d-md-block d-flex flex-column">
            <div>
              <div className="mb-20">
                <div className="image-upload text-center">
                  <label htmlFor="avatar">
                    {imgPrev ? <img src={imgPrev} className="img-upload-prev" alt="upload" /> : <Image src="/icon/upload.svg" width={120} height={120} alt="upload" />}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files[0];
                      setImgPrev(URL.createObjectURL(img));
                      return setImage(img);
                    }}
                  />
                </div>
              </div>
              <h2 className="fw-bold text-xl text-center color-palette-1 m-0">{localData.name}</h2>
              <p className="text-lg text-center color-palette-1 m-0">{localData.email}</p>
              <div className="pt-50 pb-50">
                <label htmlFor="category" className="form-label text-lg fw-medium color-palette-1 mb-10">
                  Favorite
                  Game

                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select d-block w-100 rounded-pill text-lg"
                  aria-label="Favorite Game"
                  value={favorite}
                  onChange={(event) => setFavorite(event.target.value)}
                >
                  {categories.map((category) => (
                    <option
                      key={category._id}
                      value={category._id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group d-flex flex-column mx-auto">
              <button
                type="button"
                className="btn btn-create fw-medium text-lg text-white rounded-pill mb-16"
                onClick={onSubmit}
              >
                Create My Account

              </button>
              <a
                className="btn btn-tnc text-lg color-palette-1 text-decoration-underline pt-15"
                href="#"
                role="button"
              >
                Terms &
                Conditions

              </a>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}
