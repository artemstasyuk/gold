import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'EntityListFilters',
  props: {
    filters: {
      type: Object,
      required: true
    },
    activeFilters: {
      type: Object,
      required: true
    }
  }
})
export default class EntityListFilters extends Vue {
  data () {
    return {
      isFullFilter: false
    };
  }
}
