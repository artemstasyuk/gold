<template>
  <v-layout>
    <button
      v-if="withButtons"
      :class="prevButtonClass"
      @click="navigatePrev"
    >
      <v-icon>navigate_before</v-icon>
    </button>
    <v-tooltip top>
      <template #activator="{ on }">
        <label>
          <input
            ref="input"
            class="v-pagination__navigation editable-navigation"
            :value="value"
            @keypress="onKeyPress"
            @focus="$event.target.select()"
            v-on="on"
          >
        </label>
      </template>
      <span>{{
        $t("vtCompactPagination.pageOfPages", value, totalPages)
      }}</span>
    </v-tooltip>
    <button
      v-if="withButtons"
      :class="nextButtonClass"
      @click="navigateNext"
    >
      <v-icon>navigate_next</v-icon>
    </button>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'vuetify/src/components/VPagination/VPagination.sass';

@Component({
  name: 'CompactPagination',
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    totalPages: [Number, String],
    withButtons: Boolean
  }
})
export default class CompactPagination extends Vue {
  get isFirstPage () {
    return this.$props.value <= 1;
  }

  get isLastPage () {
    const { value, totalPages } = this.$props;
    return value >= totalPages;
  }

  get prevButtonClass () {
    return [
      'v-pagination__navigation',
      {
        'v-pagination__navigation--disabled': this.isFirstPage
      }
    ];
  }

  get nextButtonClass () {
    return [
      'v-pagination__navigation',
      {
        'v-pagination__navigation--disabled': this.isLastPage
      }
    ];
  }

  navigateNext () {
    if (!this.isLastPage) {
      const { value } = this.$props;
      this.$emit('input', value + 1);
    }
  }

  navigatePrev () {
    if (!this.isFirstPage) {
      const { value } = this.$props;
      this.$emit('input', value - 1);
    }
  }

  onKeyPress (e: any) {
    if (e.key === 'Enter') {
      // @ts-ignore
      let inputValue = this.$refs.input.value;
      const { value, totalPages } = this.$props;
      if (Number(inputValue) === 0) {
        inputValue = 1;
      }

      if (inputValue > totalPages) {
        inputValue = totalPages;
        // @ts-ignore
        this.$refs.input.value = totalPages;
      }

      if (Number(inputValue) !== Number(value)) {
        this.$emit('input', inputValue);
      }
    }

    /* digits only */
    // eslint-disable-next-line prefer-regex-literals
    const exp = new RegExp('^\\d+$');
    // @ts-ignore
    if (!exp.test(e.key)) {
      e.stopPropagation();
      e.preventDefault();
    }
  }
}
</script>

<style>
.editable-navigation {
  line-height: 2rem;
  text-align: center;
  white-space: nowrap;
  min-width: 2rem;
  font-size: 14px;
}
</style>
