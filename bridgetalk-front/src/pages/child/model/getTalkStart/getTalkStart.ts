import { customAxios } from '@/shared';

export async function getTalkStart(setStartComment: any) {
  return customAxios
    .get(`/reports/talk-start`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM',
      },
      responseType: 'blob',
    })
    .then((res) => {
      setStartComment(URL.createObjectURL(res.data));
    })
    .catch((err) => console.log(err));
}
