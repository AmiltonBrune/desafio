export const dictionaryRoutes = (route) => {
  const dictionary = {
    '/': 'Item',
  };

  return dictionary[route] ? dictionary[route] : dictionary['/'];
};
