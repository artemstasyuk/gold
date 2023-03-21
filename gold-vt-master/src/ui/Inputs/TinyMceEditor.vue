<template>
  <v-input v-bind="$attrs">
    <v-layout column>
      <v-flex mb-2>
        <v-label>{{ label }}</v-label>
      </v-flex>
      <mce-editor
        id="mce-editor"
        v-model="model"
        :init="editorOptions"
      />
    </v-layout>
  </v-input>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TinymceEditor from '@tinymce/tinymce-vue';
import { openVfsBrowser } from '@/plugins/tinymce.plugin';
/* setup tinymce in plugins/tinymce.plugin.ts */

import 'tinymce/icons/default';

@Component({
  name: 'TinyMceEditor',
  components: {
    'mce-editor': TinymceEditor
  },
  props: {
    value: String,
    label: String
  }
})
export default class TinyMceEditor extends Vue {
  get editorOptions () {
    return {
      selector: 'mce-editor',
      height: 400,
      language: this.$vuetify.lang.current,
      /* BACK_URL always must contain trailing slash */
      language_url: `${import.meta.env.BASE_URL}tinymce/langs/${this.$vuetify.lang.current}.js`,
      skin_url: `${import.meta.env.BASE_URL}tinymce/skins/ui/oxide`,
      content_css: `${import.meta.env.BASE_URL}tinymce/skins/content/default/content.css`,
      external_plugins: {
        typograf: `${import.meta.env.BASE_URL}tinymce/plugins/typograf/plugin.js`
      },
      plugins: [
        'spellchecker image link fullscreen code table visualblocks paste lists advlist',
        'visualchars media template hr charmap anchor pagebreak nonbreaking typograf'
      ],
      menubar: 'file edit insert view format table',
      toolbar:
        'code | insertfile undo redo | styleselect | bold italic | bullist numlist outdent indent | spellchecker | link unlink image',
      menu: {
        file: {
          title: 'File',
          items: 'newdocument fullscreen | spellchecker code'
        },
        edit: {
          title: 'Edit',
          items: 'undo redo | cut copy paste pastetext | selectall'
        },
        insert: {
          title: 'Insert',
          items:
            'link image media | template | hr charmap anchor pagebreak nonbreaking'
        },
        view: { title: 'View', items: 'visualaid visualblocks visualchars' },
        format: {
          title: 'Format',
          items:
            'bold italic underline strikethrough superscript subscript | formats | removeformat | typograf'
        },
        table: {
          title: 'Table',
          items: 'inserttable tableprops deletetable | cell row column'
        }
      },
      extended_valid_elements: 'iframe[src|width|height|name|align|frameborder|scrolling|marginheight|marginwidth],nobr,script[language|type|src|async|defer|charset]',
      spellchecker_languages: 'Russian=ru',
      spellchecker_rpc_url: '//speller.yandex.net/services/tinyspell',
      // image_uploadtab: true,
      // images_upload_url: "test.test",
      image_advtab: true,
      image_caption: true,
      file_picker_callback: openVfsBrowser,
      convert_urls: false,
      document_base_url: import.meta.env.BASE_URL,
      mobile: {
        theme_url: `${import.meta.env.BASE_URL}tinymce/themes/mobile/theme.js`
      }
    };
  }

  get model () {
    return this.$props.value;
  }

  set model (v: any) {
    this.$emit('input', v);
  }
}
</script>

<style scoped></style>
