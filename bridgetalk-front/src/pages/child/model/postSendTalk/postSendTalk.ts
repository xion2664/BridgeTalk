import { customAxios } from '@/shared';

export async function postSendTalk(reportsId: number, audio: Blob) {
  const formData = new FormData();

  const audioBlob = new Blob([audio], { type: 'audio/mpeg' });

  formData.append('reportsFile', audio);

  return customAxios
    .post(
      `/reports/talk-send/${reportsId}`,
      {},
      {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiNTgxMGJmZTAtNTIxOC00MWNkLThiNzEtNzc0MTdlNWI4YjQ0IiwiaWF0IjoxNzE0NTcyMzIxLCJleHAiOjE3MTU3ODE5MjF9.nBXZXPoO1UM4jS5_LaeVttS9l8XMYfStecwvORVOFvM',
        },
      },
    )
    .catch((err) => console.log(err));
}
