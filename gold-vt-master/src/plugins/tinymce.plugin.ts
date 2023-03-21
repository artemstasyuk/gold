import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/silver';
import qs from 'querystringify';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/spellchecker';
import 'tinymce/plugins/image';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/media';
import 'tinymce/plugins/template';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';

import { FILE_MANAGER_EMBEDDED_PATH } from '@/consts/filemanager';

tinymce.init({});

export type MCEDialogBrowserCallback = (value: string, meta: object) => void;
export type VFSSelectFileMessage = {
  mceAction: 'selectFile';
  file: {
    path: string;
    name: string;
    width: number;
    height: number;
  };
  meta: Record<string, any>;
};

export const openVfsBrowser = (
  callback: MCEDialogBrowserCallback,
  value: string,
  meta: Record<string, any>
) => {
  /* strip last slash in BASE_URL */
  const query: Record<string, any> = {};
  if (value) {
    query.filename = value;
  }
  const queryString = qs.stringify(query);
  const mceUrl = `${String(import.meta.env.BASE_URL).slice(0, -1)}${FILE_MANAGER_EMBEDDED_PATH}${queryString && `?${queryString}`}`;

  tinymce.activeEditor.windowManager.openUrl({
    url: mceUrl,
    title: 'VFS',
    width: 900,
    height: 740,
    onMessage: (api, message) => {
      /* return file and updated meta */
      callback && callback(message.file.path, {
        ...meta,
        alt: message.file.name,
        width: `${message.file.width}px`,
        height: `${message.file.height}px`
      });

      api.close();
    }
  });
  return false;
};
