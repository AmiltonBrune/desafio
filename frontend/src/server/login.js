import api from '../api/';

export async function login({ email, password }) {
  return api.post('/users/login', { email, password });
}

export async function logout({ token }) {
  return api({
    url: '/users/logout',
    method: 'put',
    headers: { Authorization: token },
  });
}
