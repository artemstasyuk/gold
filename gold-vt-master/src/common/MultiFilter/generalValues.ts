import STATUSES from '@/consts/status';
import BOOLEAN_TYPES from '@/consts/booleanTypes';

import { IStaticItems } from './types';

export type GeneralStaticType =
    | 'vt-status-select'
    | 'vt-boolean-select'

export const generalStaticValues = {
  'vt-status-select': {
    items: STATUSES
  },
  'vt-boolean-select': {
    items: BOOLEAN_TYPES
  }
} as IStaticItems;
