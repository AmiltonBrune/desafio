import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import Item from 'pages/Items';

const AppRoutes = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<Item />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
