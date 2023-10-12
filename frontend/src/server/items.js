import api from '../api';

export async function getAllItems({ token }) {
  return api({
    url: '/items',
    method: 'get',
    headers: { Authorization: token },
  });
}

export async function createItem({ token, item }) {
  return api({
    url: '/items',
    method: 'post',
    headers: { Authorization: token },
    data: item,
  });
}

export async function deleteItem({ token, id }) {
  return api({
    url: `/items/${id}`,
    method: 'delete',
    headers: { Authorization: token },
  });
}

export async function updateItem({ token, item }) {
  return api({
    url: `/items/${item.id}`,
    method: 'put',
    headers: { Authorization: token },
    data: item,
  });
}
