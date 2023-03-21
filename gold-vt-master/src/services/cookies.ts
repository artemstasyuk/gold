import * as cookie from 'cookie';

interface IGetCookieOptions {
  json?: boolean
}

export function getCookie (cookies: string, name: string, options: IGetCookieOptions = {}) {
  if (!cookies) return null;

  const { json } = options;
  const parsedCookie = cookie.parse(cookies)[name];

  if (json) {
    try {
      return JSON.parse(parsedCookie);
    } catch (err) {
      if (err instanceof SyntaxError) return null;

      throw err;
    }
  }

  return parsedCookie || null;
}
