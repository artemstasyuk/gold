import { CustomStaticType } from './customValues';
import { GeneralStaticType } from './generalValues';

export type StaticType = GeneralStaticType | CustomStaticType

export type IStaticItems = {
  [name in StaticType]: {
    items: any
  }
}
