import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import Layout from '@/components/layout';

import Loadable from '@/components/Loadable';
const Home = Loadable(lazy(() => import('@/pages/home')));
const MainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/home" />
    },
    {
      path: '/home',
      element: <Home />
    }
  ]
};

export default MainRoutes;
