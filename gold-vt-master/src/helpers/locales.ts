import merge from 'lodash/merge';

import { SUPPORTED_LOCALES } from '@/consts/index';

export function prepareLocales (locales: Record<string, any>) {
  return SUPPORTED_LOCALES.reduce((acc, lang) => {
    const keys = Object.keys(locales).filter(item => {
      return item.match(new RegExp(`${lang}.json`));
    });

    return {
      ...acc,
      [lang]: keys.reduce((acc, key) => merge(acc, locales[key].default), {})
    };
  }, {});
}
