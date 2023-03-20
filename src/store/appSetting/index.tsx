import { useCallback, useContext } from 'react';
import { AdminOrg, Auth, Claim, Theme } from './reducer';
import { AppSettingContext } from './context';

export function useAppSetting() {
  const [{ theme, i18n, auth, claim, adminOrg }, dispatch] =
    useContext(AppSettingContext);

  const setTheme = useCallback(
    (theme: Theme) => dispatch('setTheme', theme),
    []
  );
  const setAuth = useCallback((auth: Auth) => dispatch('setAuth', auth), []);
  const setClaim = useCallback(
    (claim: Claim) => dispatch('setClaim', claim),
    []
  );
  const setAdminOrg = useCallback(
    (adminOrg: AdminOrg[]) => dispatch('setAdminOrg', adminOrg),
    []
  );

  return {
    appSetting: {
      theme,
      i18n,
      auth,
      claim,
      adminOrg
    },
    theme,
    i18n,
    auth,
    claim,
    adminOrg,
    setTheme,
    setAuth,
    setClaim,
    setAdminOrg
  };
}
