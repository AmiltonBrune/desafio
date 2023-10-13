import api from '../api/';

export async function getUserData({ token }) {
  return api({
    url: '/users',
    method: 'get',
    headers: { Authorization: token },
  });
}

export async function register({ email, password }) {
  return api.post('/users', { email, password });
}

export async function confirmMail({ code }) {
  return api.get(`/users/confirm/${code}`);
}
