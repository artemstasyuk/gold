<template>
  <div>
    <v-text-field
      v-model="timeValue"
      :label="label"
      :placeholder="placeholder"
      :hide-details="hideDetails"
      :disabled="disabled"
      append-icon="access_time"
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
      :return-value.sync="timeValue"
    >
      <v-time-picker
        v-model="pickerTime"
        :locale="$vuetify.lang.current"
        format="24hr"
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
          @click="$refs.dialog.save(pickerTime)"
        >
          OK
        </v-btn>
      </v-time-picker>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { format } from 'date-fns';
import { createDate } from '@/helpers/date';

@Component({
  name: 'TimePicker',
  props: {
    value: String,
    label: String, // vuetify,
    placeholder: {
      type: String, // vuetify
      default: format(createDate(), 'HH:mm:ss')
    },
    mask: String, // vuetify
    hideDetails: Boolean, // vuetify
    disabled: Boolean // vuetify
  }
})
export default class DatePicker extends Vue {
  modal: boolean = false

  get timeValue () {
    return this.$props.value;
  }

  set timeValue (v: string | null) {
    if (!v) {
      this.$emit('input', null);
      return;
    }

    /* Not emmit unless value is valid */
    if (this.isValidTime(v)) {
      const newValue = this.formatTime(v);
      this.$emit('input', newValue);
    }
  }

  get pickerTime () {
    const { value } = this.$props;
    return value ? this.formatTime(value) : '';
  }

  set pickerTime (v: string | null) {
    this.timeValue = v;
  }

  /* To DatePicker format */
  formatTime (v: string) {
    if (!this.isValidTime(v)) {
      return null;
    }
    const [hours, minutes, seconds = '00'] = v.split(':');
    return `${hours}:${minutes}:${seconds}`;
  }

  isValidTime (v: string): boolean {
    return this.isFull(v);
  }

  isFull (v: string): boolean {
    if (!v) {
      return false;
    }
    const [hours, minutes, seconds = '00'] = v.split(':');
    return (
      Boolean(hours && minutes && seconds) &&
        String(hours + minutes + seconds).length === 6
    );
  }
}
</script>
