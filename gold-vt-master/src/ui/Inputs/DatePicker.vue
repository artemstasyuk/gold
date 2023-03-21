<template>
  <div>
    <v-text-field
      v-model="dateValue"
      :label="label"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :error-messages="errorMessages"
      :disabled="disabled"
      append-icon="event"
      readonly
      clearable
      @click.stop="modal = true"
      @click:append.stop="modal = true"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <v-dialog
      ref="dialog"
      v-model="modal"
      persistent
      width="290px"
      :return-value.sync="dateValue"
    >
      <v-date-picker
        v-model="pickerDate"
        placeholder=""
        :locale="$vuetify.lang.current"
        :first-day-of-week="1"
        color="primary"
      >
        <v-spacer />
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(pickerDate)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';

const DATE_FORMAT = 'dd.MM.yyyy';
const PICKER_DATE_FORMAT = 'yyyy-MM-dd';

@Component({
  name: 'DatePicker',
  props: {
    value: String,
    label: String, // vuetify,
    placeholder: {
      type: String, // vuetify
      default: format(new Date(), DATE_FORMAT)
    },
    mask: String, // vuetify,
    hideDetails: Boolean, // vuetify
    disabled: Boolean, // vuetify,
    dateFormat: {
      type: String,
      default: DATE_FORMAT
    },
    errorMessages: [Array, String]
  }
})
export default class DatePicker extends Vue {
  modal: boolean = false

  get dateValue () {
    return this.$props.value;
  }

  set dateValue (v: string | null) {
    if (!v) {
      this.$emit('input', null);
      return;
    }
    if (this.isValidDate(v)) {
      const newValue = this.parseDate(v);
      this.$emit('input', newValue);
    }
  }

  get pickerDate () {
    return this.getSafePickerDate(this.$props.value);
  }

  set pickerDate (v: string | null) {
    this.dateValue = v;
  }

  /* To DatePicker format */
  parseDate (v: string) {
    if (!this.isValidDate(v)) {
      return null;
    }

    const { dateFormat } = this.$props;
    const date = parse(v, PICKER_DATE_FORMAT, new Date());
    return format(date, dateFormat);
  }

  isValidDate (v: string): boolean {
    const date = parse(v, PICKER_DATE_FORMAT, new Date());
    return isValid(date);
  }

  /* Need for keyboard */
  isFull (v: string): boolean {
    if (!v) {
      return false;
    }
    /* date-fns parse format is YYYY-MM-DD but not YYYY-MM-D, need to check length */
    const [year, month, day] = v.split('-');
    return (
      Boolean(year && month && day) && String(year + month + day).length === 8
    );
  }

  getSafePickerDate (v: string | null) {
    if (!v) {
      return null;
    }
    const date = parse(v, this.$props.dateFormat, new Date());
    return format(date, PICKER_DATE_FORMAT);
  }
}
</script>
