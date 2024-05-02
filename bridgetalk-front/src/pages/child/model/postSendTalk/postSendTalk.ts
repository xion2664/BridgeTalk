import { customAxios } from '@/shared';

export async function postSendTalk(reportsId: number, audio: Blob) {
  const formData = new FormData();

  formData.append('reportsFile', audio);

  return customAxios
    .patch(`/reports/talk-send/${reportsId}`, formData, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM',
      },
      responseType: 'blob',
    })
    .catch((err) => console.log(err));
}
