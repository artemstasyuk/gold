// import { IS_DEV } from '@/consts';

type MenuEntry = {
  title: string;
  name?: string;
  group?: string;
  list?: Array<MenuEntry>
}

const menu: Array<MenuEntry> = [
  /* {
    group: 'someRoute',
    title: 'Раздел',
    name: 'someEntityList',
    list: [
      { title: 'Вложенный раздел', name: 'someNestedEntityList' }
    ]
  }, */
  {
    group: 'users',
    title: 'Пользователи',
    name: 'userList'
  },
  {
    title: 'Файлы',
    name: 'file-manager'
  }
];

/* if (IS_DEV) {
  menu.push({
    group: 'dev',
    title: 'Разработка',
    name: 'dev',
    list: [{ title: 'Форма', name: 'devForm' }]
  });
} */

export default menu;
