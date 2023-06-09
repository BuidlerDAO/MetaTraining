/**
 * @description 获取API URL前缀，根据环境进行判断
 */
export const getBaseUrl = (url: string): string => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    // 开发环境 - 根据请求不同返回不同的BASE_URL
    if (url.includes('/api/')) {
      BASE_URL = 'http://example.net/api';
    } else if (url.includes('/other-api/')) {
      BASE_URL = 'http://test-other-example.net';
    } else {
      BASE_URL = 'http://example.net';
    }
  } else if (process.env.NODE_ENV === 'mock') {
    BASE_URL = '';
  } else {
    // 生产环境
    if (url.includes('/api/')) {
      BASE_URL = 'https://example.net/api';
    } else if (url.includes('/other-api/')) {
      BASE_URL = 'https://other-example.net';
    } else {
      BASE_URL = 'https://example.net/api';
    }
    // 用于将api地址转换成https
    BASE_URL = BASE_URL.replace('http://', 'https://');
  }
  return BASE_URL;
};

/**
 * @description 获取API URL，根据环境进行判断
 */
export const getApiUrl = (originUrl: string): string => {
  const baseUrl = import.meta.env.VITE_BASE_API_URL;
  let url: string = originUrl;
  if (
    process.env.NODE_ENV === 'prod' ||
    process.env.NODE_ENV === 'development'
  ) {
    if (originUrl.includes('/api/')) {
      url = url.split('/api')[1];
    }
    if (originUrl.includes('/other-api/')) {
      url = url.split('/other-api')[1];
    }

    return baseUrl + url;
  }
  return url;
};

/**
 * @description 获取 queryString
 */
export const getQueryString = (name: string): string | null => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURIComponent(r[2]);
  return null;
  // const searchParams = new URLSearchParams(window.location.search);
  // return searchParams.get(name);
};

/**
 * @description 设置 queryString
 */
export function setSearchParam(param: string, value: string) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

/**
 * @description 删除某个 queryString
 */
export function deleteSearchParam(key: string) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(key);
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}?${searchParams.toString()}`
  );
}

/**
 * @description 获取token
 */
export const getToken = (): string | null => {
  return getQueryString('token');
};

/**
 * @description throttle
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const throttle = function (fn: any, deplay: number) {
  let wait = false;
  return function (this: any, ...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;
    // eslint-disable-next-line prefer-rest-params
    if (!wait) {
      wait = true;
      setTimeout(() => {
        fn.apply(that, args);
        wait = false;
      }, deplay);
    }
  };
};

/**
 * @description debounce
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const debounce = function (excute: any, delay: number) {
  let timer;
  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      excute.apply(this, args);
    }, delay);
  };
};

/**
 * @description isIos
 */
export const isIos = (): boolean => {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
};

/**
 * @description 获取平台
 */
export const getPlatform = (): string => {
  const ua = navigator.userAgent;
  if (ua.match(/MicroMessenger/i)) {
    return 'MicroMessenger';
  }
  if (ua.match(/WeiBo/i)) {
    return 'WeiBo';
  }
  if (ua.match(/QQ/i)) {
    return 'QQ';
  }
  return '';
};

/**
 * @description 字符串获取时间戳，兼容ios
 */
export const getDate = (date: string): Date => {
  return new Date(date.replace(/-/g, '/'));
};

export const toPercent = (val: number) => {
  return `${(Math.abs(val) * 100).toFixed(2)}%`;
};

export const copyMsg = (msg: string) => {
  navigator.clipboard.writeText(msg);
};
