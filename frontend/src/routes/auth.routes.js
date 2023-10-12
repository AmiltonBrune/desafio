import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Signin from 'pages/Signin';

const AuthRoutes = () => (
  <Routes>
    <Route path='/' element={<Signin />} />
  </Routes>
);

export default AuthRoutes;
