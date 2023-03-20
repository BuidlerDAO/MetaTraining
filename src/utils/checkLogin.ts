import { NavigateFunction } from 'react-router-dom';
import { getWeb3Account, getWeb3SignMessage } from './web3';

export const linkAfterCheckLogin = async (
  route: string,
  navigate: NavigateFunction,
  beforeLoad?: () => void
) => {
  if (!localStorage.getItem('token') || !localStorage.getItem('address')) {
    if (beforeLoad) beforeLoad();
    const res: any = await utilLogin();
    if (res.auth.token) {
      if (route == '/profile') {
        navigate(`/user/${res.auth.address}`, { replace: true });
      } else {
        navigate(route, { replace: true });
      }
      window.location.reload();
    }
  } else {
    if (beforeLoad) beforeLoad();
    navigate(route, { replace: true });
  }
};

export const utilLogin = async () => {
  const adds = await getWeb3Account();
  const sig = await getWeb3SignMessage('welcome');
  return false;
};

export const checkoutToken = () => {
  try {
    const token = localStorage.getItem('token') || '';
    if (token) {
      const exp = window.atob(token.split('.')[1]);
      if (new Date().getTime() > +exp * 1000) {
        // 过期
        loginOut();
        return false;
      } else {
        return true;
      }
    }
    return false;
  } catch (error) {
    loginOut();
    return false;
  }
};

export const loginOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('address');
  localStorage.removeItem('name');
  localStorage.removeItem('avatar');
  localStorage.removeItem('uid');
  localStorage.removeItem('isInWhiteList');
  localStorage.removeItem('number');
  localStorage.removeItem('popup');
};
