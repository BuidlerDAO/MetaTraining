import { createContext, ReactNode, useCallback, useReducer } from 'react';
import {
  Actions,
  ActionsMap,
  AdminOrg,
  AppSettingReducer,
  AppSettingState,
  Auth,
  Claim,
  I18n,
  Theme
} from './reducer';

export type Dispatcher = <
  Type extends Actions['type'],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type AppSettingContextInterface = readonly [AppSettingState, Dispatcher];

const initTheme: Theme = {
  mode: 'light'
};

const initI18n: I18n = {
  lang: navigator.language || 'en-US'
};

const initAuth: Auth = {
  address: localStorage.getItem('address') || '',
  token: localStorage.getItem('token') || '',
  name: localStorage.getItem('name') || '',
  avatar: localStorage.getItem('avatar') || '',
  uid: localStorage.getItem('uid') ? Number(localStorage.getItem('uid')) : 0,
  isInWhiteList:
    localStorage.getItem('isInWhiteList') === 'true' ? true : false,
  popup: Number(localStorage.getItem('popup')) || 0,
  number: Number(localStorage.getItem('number')) || 0
};

const initClaim: Claim = {
  toClaim: 0
};

const initAdminOrg: AdminOrg[] = [];

export const AppSettingContext = createContext<AppSettingContextInterface>([
  {
    theme: initTheme,
    i18n: initI18n,
    auth: initAuth,
    claim: initClaim,
    adminOrg: initAdminOrg
  },
  () => null
]);

export function AppSettingProvider({ children }: { children: ReactNode }) {
  const [state, _dispatch] = useReducer(AppSettingReducer, {
    theme: initTheme,
    i18n: initI18n,
    auth: initAuth,
    claim: initClaim,
    adminOrg: initAdminOrg
  });

  const dispatch: Dispatcher = useCallback((type, ...payload) => {
    _dispatch({ type, payload: payload[0] } as Actions);
  }, []);
  return (
    <AppSettingContext.Provider value={[state, dispatch]}>
      {children}
    </AppSettingContext.Provider>
  );
}
