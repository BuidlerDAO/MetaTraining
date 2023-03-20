export function AppSettingReducer(
  state: AppSettingState,
  action: Actions
): AppSettingState {
  switch (action.type) {
    case 'setTheme':
      return {
        ...state,
        theme: action.payload
      };

    case 'setI18n':
      return {
        ...state,
        i18n: action.payload
      };
    case 'setAuth':
      return {
        ...state,
        auth: action.payload
      };
    case 'setClaim':
      return {
        ...state,
        claim: action.payload
      };
    case 'setAdminOrg':
      return {
        ...state,
        adminOrg: action.payload
      };
  }
}

export interface Theme {
  mode: string;
}

export interface I18n {
  lang: string;
}

export interface Auth {
  address: string;
  token: string;
  name: string;
  avatar: string;
  uid: number;
  isInWhiteList: boolean;
  popup: number;
  number: number;
}

export interface Claim {
  toClaim: number;
}

export interface AdminOrg {
  id: string;
  name: string;
  slug: string;
}

export type AppSettingState = {
  theme: Theme;
  i18n: I18n;
  auth: Auth;
  claim: Claim;
  adminOrg: AdminOrg[];
};

export type ActionsMap = {
  setTheme: Theme;
  setI18n: I18n;
  setAuth: Auth;
  setClaim: Claim;
  setAdminOrg: AdminOrg[];
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];
