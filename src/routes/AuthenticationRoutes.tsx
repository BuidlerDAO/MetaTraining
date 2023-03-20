// project imports
import Loadable from '@/components/Loadable';
import { lazy } from 'react';

const Login = Loadable(lazy(() => import('@/pages/login')));

const AuthenticationRoutes = {
  path: '/',
  children: [
    {
      path: '/login',
      element: <Login />
    }
  ]
};

export default AuthenticationRoutes;
