import { BASE_URL } from '.';
export const FILE_MANAGER_PER_PAGE = 25;
export const FILE_MANAGER_MEDIA_URL = import.meta.env.VITE_VFS_MEDIA_URL;
export const FILE_MANAGER_EMBEDDED_PATH = '/files/embedded';

export const FILE_MANAGER_FILE_ICON_BY_EXT: Record<string, string> = {
  mp4: BASE_URL + 'img/filemanager/icons/file-video-solid.svg',
  avi: BASE_URL + 'img/filemanager/icons/file-video-solid.svg',
  mov: BASE_URL + 'img/filemanager/icons/file-video-solid.svg',
  webm: BASE_URL + 'img/filemanager/icons/file-video-solid.svg',

  mp3: BASE_URL + 'img/filemanager/icons/file-audio-solid.svg',
  wav: BASE_URL + 'img/filemanager/icons/file-audio-solid.svg',
  ogg: BASE_URL + 'img/filemanager/icons/file-audio-solid.svg',

  doc: BASE_URL + 'img/filemanager/icons/file-word-solid.svg',
  docx: BASE_URL + 'img/filemanager/icons/file-word-solid.svg',
  txt: BASE_URL + 'img/filemanager/icons/file-text-solid.svg',
  xls: BASE_URL + 'img/filemanager/icons/file-excel-solid.svg',
  xlsx: BASE_URL + 'img/filemanager/icons/file-excel-solid.svg',
  pdf: BASE_URL + 'img/filemanager/icons/file-pdf-solid.svg',

  css: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',
  html: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',
  js: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',
  jsx: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',
  scss: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',
  styl: BASE_URL + 'img/filemanager/icons/file-code-solid.svg',

  arc: BASE_URL + 'img/filemanager/icons/file-archive-solid.svg',
  zip: BASE_URL + 'img/filemanager/icons/file-archive-solid.svg',
  rar: BASE_URL + 'img/filemanager/icons/file-archive-solid.svg',

  default: BASE_URL + 'img/filemanager/icons/file-solid.svg'
};
