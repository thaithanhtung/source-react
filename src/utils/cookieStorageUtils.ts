import Cookies, { Cookie, CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: Cookie, options: CookieSetOptions): void => {
  cookies.set(name, value, options);
};

export const getCookie = (name: string): any => {
  return cookies.get(name);
};
