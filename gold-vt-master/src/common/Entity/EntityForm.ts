import { Component, Vue, Watch } from 'vue-property-decorator';
import { getI18nFieldError } from '@/consts/errors';
import { reaction } from 'mobx';

@Component({
  name: 'Form'
})
export default class EntityForm extends Vue {
  i18nFieldError = getI18nFieldError;
  store!: any;

  @Watch('$vuetify.lang.current')
  languageChanged () {
    this.store.isChanged && this.store.validate();
  }

  get withLabel () {
    return this.$vuetify.breakpoint.smAndUp;
  }

  data () {
    return {
      tab: null, // used on forms with tabs,
      tabsHasError: []
    };
  }

  created () {
    /* React on changes in errors, and update list of tabs */
    reaction(
      () => this.store.errors,
      () => {
        setTimeout(() => {
          const { form } = this.$refs;
          if (form) {
            const tabsHasError: Array<number> = [];
            // @ts-ignore
            const tabs = form.$el.querySelectorAll('.v-window-item');
            // eslint-disable-next-line unicorn/no-array-for-each
            tabs.forEach((tab: Element, index: number) => {
              if (tab.querySelector('.hasError')) {
                tabsHasError.push(index);
              }
            });
            this.$data.tabsHasError = tabsHasError;
          }
        });
      }
    );
  }

  async mounted () {
    if (this.$route.params.id) {
      /* Form in edit mode */
      const exist = await this.store.getById(Number(this.$route.params.id));
      if (!exist) {
        this.$router.replace({ name: 'notFound' });
      }
    }
  }

  async onSave () {
    return this.store.model.id
      ? this.store.update()
      : this.store.add();
  }

  async onSaveAndBack () {
    if (await this.onSave()) {
      this.navigateBack();
    }
  }

  async onDelete (displayField = 'title') {
    if (
      confirm(
        this.$t(
          'common.confirmDelete',
          this.store.model[displayField] || this.store.model.id
        )
      )
    ) {
      const result = await this.store.delete();
      if (result) {
        this.navigateBack();
      }
    }
  }

  navigateBack () {
    /* Uncomment for use back in history, save filters and other */
    this.$router.go(-1);

    /* Uncomment for navigate to entity list and reset all filters */
    // this.$router.push({ name: "categoryList" });
  }
}
