import axios, { AxiosInstance } from 'axios';
import { getCookie } from './cookie';
import Swal from 'sweetalert2';

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    Authorization:
      'Bearer ' +
      atob(sessionStorage.getItem(btoa('access' + process.env.REACT_APP_SECURE_CODE))!).split(
        `${process.env.REACT_APP_SECURE_CODE}`,
      )[0],
  },
});

// export const dataAxios: AxiosInstance = axios.create({
//   baseURL: `${process.env.REACT_APP_DATA_URL}`,
// });

// customAxios.interceptors.request.use(
//   (config) => {
//     const token = getCookie('memberToken');

//     if (token) {
//       config.headers['Authorization'] = 'Bearer' + ' ' + token;
//     }

//     return config;
//   },
//   (error) => {
//     console.log(error);

//     return Promise.reject(error);
//   },
// );

// customAxios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error);
//     if (error.response && error.response.status === 486) {
//       Swal.fire('토큰이 만료되었습니다. 재로그인이 필요합니다.');
//     }
//     return Promise.reject(error);
//   },
// );

// dataAxios.interceptors.request.use(
//   (config) => {
//     const token = getCookie('memberToken'); // 'memberToken' 쿠키의 값을 가져옵니다.

//     if (token) config.headers['Authorization'] = 'Bearer' + ' ' + token;

//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   },
// );
