<template>
  <v-autocomplete
    v-model="model"
    :search-input.sync="searchInput"
    :items="items"
    :disabled="disabled"
    :loading="isLoading"
    :filter="() => true"
    :placeholder="$t('yandexGeoCode.placeholder')"
    item-text="text"
    item-value="value"
    autocomplete="off"
  />
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import YandexGeoCodeService from '@/services/YandexGeoCodeService';
import _debounce from 'lodash/debounce';
import _get from 'lodash/get';

@Component({
  name: 'YandexGeoCode',
  props: {
    value: String,
    disabled: Boolean,
    namePath: {
      type: String,
      default: 'GeoObject.metaDataProperty.GeocoderMetaData.text'
    },
    valuePath: {
      type: String,
      default: 'GeoObject.Point.pos'
    }
  }
})
export default class YandexGeoCode extends Vue {
  searchInput: string = '';
  valuePath!: string;
  namePath!: string;
  suggestions: Array<Record<any, any>> = [];
  isLoading: boolean = false;

  get model () {
    return this.$props.value;
  }

  set model (v: string) {
    this.$emit('input', v);
  }

  get items () {
    return this.suggestions.map(s => {
      return { text: _get(s, this.namePath), value: _get(s, this.valuePath) };
    });
  }

  @Watch('searchInput')
  onSearchInputChange = _debounce(this.search, 500)

  async search (v: string) {
    if (v) {
      this.isLoading = true;
      const response = await YandexGeoCodeService.search(v);
      this.suggestions = _get(response, 'GeoObjectCollection.featureMember', []);
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>

</style>
