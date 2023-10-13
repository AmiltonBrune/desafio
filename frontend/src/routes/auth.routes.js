import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Signin from 'pages/Signin';
import ActivateAccount from 'pages/ActivateAccount';
import Signup from 'pages/Signup';

const AuthRoutes = () => (
  <Routes>
    <Route path='/' element={<Signin />} />
    <Route path='/activate-account/:code' element={<ActivateAccount />} />
    <Route path='/signup' element={<Signup />} />
  </Routes>
);

export default AuthRoutes;
