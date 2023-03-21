import { isValue } from '@/helpers/utils';

export const toBoolean = (v: any): boolean => {
  switch (
    String(v)
      .toLowerCase()
      .trim()
  ) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(v);
  }
};

const castMap = {
  number: (v: any): number => (isValue(v) && !Number.isNaN(Number(v)) ? Number(v) : v),
  string: (v: any): string => (isValue(v) ? String(v) : v),
  boolean: toBoolean,
  'Array<number>': (v: Array<any>): Array<number> => {
    if (!isValue(v)) {
      return [];
    }
    return (Array.isArray(v) ? v : [v])
      .map((i: any) => {
        return Number(i);
      })
      .filter(i => !Number.isNaN(i));
  },
  'Array<string>': (v: Array<any>): Array<string> => {
    if (!isValue(v)) {
      return [];
    }
    return (Array.isArray(v) ? v : [v])
      .map((i: any) => {
        return String(i);
      })
      .filter(i => i);
  },
  'Array<boolean>': (v: Array<any>): Array<boolean> => {
    return (v || []).map(toBoolean);
  },
  'Array<undefined>': (v: Array<any>): Array<any> => v
} as Record<string, any>;

export const typeCastByMeta = (value: any, field: string, meta: any) => {
  const fn = castMap[meta[field]];
  if (fn) {
    return fn(value);
  }
  // eslint-disable-next-line no-console
  console.warn(`Cant find cast rule for ${field} in`, meta);
  return value;
};

export const typeCastObjectByMeta = (object: Record<any, any>, meta: any): Record<any, any> => {
  const casted: Record<any, any> = {};
  for (const k of Object.keys(object)) {
    casted[k] = typeCastByMeta(object[k], k, meta);
  }

  return casted;
};

export const collectTypesFromObject = (object: any): Record<string, string> => {
  return Object.keys(object).reduce(
    (acc, key: string) => {
      const fieldType = typeof object[key];
      if (['string', 'number', 'boolean'].includes(fieldType)) {
        acc[key] = fieldType;
      }
      if (typeof object[key] === 'object') {
        const isArray = Array.isArray(object[key]);
        if (isArray) {
          const typeOfFirst = typeof object[key][0];
          acc[key] = `Array<${typeOfFirst}>`;
        }
      }
      return acc;
    },
    {} as Record<string, string>
  );
};
