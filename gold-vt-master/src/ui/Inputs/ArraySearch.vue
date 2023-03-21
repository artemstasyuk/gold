<template>
  <v-combobox
    v-model="model"
    :search-input.sync="searchString"
    multiple
    small-chips
    deletable-chips
    v-bind="restProps"
    @keypress.native="onKeyPress"
    @paste.native="onPaste"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import _union from 'lodash/union';
import { collectTypesFromObject, typeCastByMeta } from '@/helpers/typeCast';

/* todo: refactor with bind $attrs */
@Component({
  name: 'ArraySearch',
  data () {
    return {
      searchString: ''
    };
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    matchPattern: {
      type: String,
      default: '^\\d+$'
    },
    pastePattern: {
      type: String,
      default: '\\d+'
    },
    label: String, // vuetify
    disabled: Boolean, // vuetify
    'error-messages': [Array, String], // vuetify
    loading: Boolean, // vuetify
    clearable: Boolean, // vuetify
    outline: Boolean, // vuetify,
    solo: Boolean // vuetify
  }
})
export default class ArraySearch extends Vue {
  get restProps () {
    const { value, matchPattern, pastePattern, ...rest } = this.$props;
    return rest;
  }

  get model () {
    return [...(this.$props.value) || []];
  }

  set model (value) {
    this.$emit('input', value);
  }

  onKeyPress (e: any) {
    const { matchPattern } = this.$props;
    const exp = new RegExp(matchPattern);

    if (!exp.test(String(e.key))) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  onPaste (e: any) {
    e.preventDefault();
    const { pastePattern } = this.$props;
    // @ts-ignore window.clipboardData
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const exp = new RegExp(pastePattern, 'g');
    const matched = pastedData.match(exp);

    if (matched) {
      const castedToPropType = typeCastByMeta(
        matched,
        'value',
        collectTypesFromObject(this.$props)
      );
      this.model = _union(this.model, castedToPropType);
    }
  }
}
</script>

<style scoped></style>
