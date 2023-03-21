import { Component, Vue, Watch } from 'vue-property-decorator';
import _debounce from 'lodash/debounce';

@Component
export default class EntityList extends Vue {
  store!: any;

  /* todo: bug, fired twice when using mixins */
  @Watch('$route')
  routeChanged () {
    this.debouncedFetch();
  }

  data () {
    return {
      filtersIsOpen: false,
      selected: []
    };
  }

  async created () {
    await this.fetch();

    this.$data.filtersIsOpen = Boolean(this.store.activeFiltersCount);
  }

  debouncedFetch = _debounce(this.fetch, 50);

  async fetch () {
    this.store.setStateFromQuery(this.$route.query);
    await this.store.fetch();
  }

  deleteItem (item: any, displayField = 'title') {
    if (confirm(Vue.prototype.$t('common.confirmDelete', item[displayField]))) {
      this.store.delete(item.id);
    }
  }

  submitFilters () {
    this.$data.selected = [];
    this.$router.push({
      name: this.$route.name as string,
      query: {
        ...this.store.query
        // page: 1 //reset page to first when filters apply
      }
    });
  }

  resetFilters () {
    this.$router.push({
      name: this.$route.name as string
    });
  }

  resetFiltersKey (key: string) {
    this.store.filters[key] = null;
    this.submitFilters();
  }

  setCompactPagination (page: number) {
    if (!this.store) {
      return;
    }

    this.store.pagination = {
      ...this.store.pagination,
      page
    };
    this.$router.push({
      name: this.$route.name as string,
      query: this.store.query
    });
  }

  setPagination (value: any) {
    if (!this.store) {
      return;
    }

    /* Migration from 1 to 2 version of vuetify */
    const v1Value = {
      ...value,
      sortBy: value.sortBy[0],
      descending: value.sortDesc[0],
      rowsPerPage: value.itemsPerPage
    };
    this.store.pagination = v1Value;
    this.$router.push({
      name: this.$route.name as string,
      query: this.store.query
    });
  }
}
