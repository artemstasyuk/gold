<template>
  <v-layout class="vt-datetime-picker">
    <v-label
      absolute
      value
      :focused="focused"
    >
      {{ label }}
    </v-label>
    <v-input
      :messages="messages"
      :error-messages="errorMessages"
    >
      <v-flex mr-2>
        <vt-date-picker
          v-model="dateModel"
          :placeholder="datePlaceholder"
          label=""
          hide-details
          @focus="focused = true"
          @blur="focused = false"
        />
      </v-flex>
      <v-flex>
        <vt-time-picker
          v-model="timeModel"
          :disabled="!dateModel"
          :placeholder="timePlaceholder"
          label=""
          hide-details
          @focus="focused = true"
          @blur="focused = false"
        />
      </v-flex>
    </v-input>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import format from 'date-fns/format';

import { appendTimezoneOffset, parseDateFromTimeZone } from '@/helpers/date';
import { parse } from 'date-fns';

const DATE_FORMAT = 'dd.MM.yyyy';
const PICKER_DATE_FORMAT = 'yyyy-MM-dd';

@Component<DateTimePicker>({
  name: 'DateTimePicker',
  props: {
    label: String,
    value: String,
    iso: Boolean,
    datePlaceholder: String,
    timePlaceholder: String,
    messages: [String, Array],
    errorMessages: [String, Array]
  },

  watch: {
    value: {
      immediate: true,
      handler () {
        this.updateDateModel();
        this.updateTimeModel();
      }
    },
    iso: {
      handler () {
        this.updateDateModel();
        this.updateTimeModel();
      }
    },
    timeModel (value: string) {
      this.emitValue(this.dateModel, value);
    },
    dateModel (value: string) {
      this.emitValue(value, this.timeModel);
    }
  }
})
export default class DateTimePicker extends Vue {
  timeModel: string = ''
  dateModel: string = ''

  data () {
    return {
      focused: false
    };
  }

  updateDateModel () {
    const { value, iso } = this.$props;
    if (value) {
      if (iso) {
        const date = parseDateFromTimeZone(value as string);
        this.dateModel = format(date, DATE_FORMAT);
        return;
      }

      const [date] = value.split(' ');
      this.dateModel = date;
      return;
    }

    this.dateModel = '';
  }

  updateTimeModel () {
    const { value, iso } = this.$props;
    if (value) {
      if (iso) {
        const date = parseDateFromTimeZone(value as string);
        this.timeModel = format(date, 'HH:mm:ss') !== '00:00:00' ? format(date, 'HH:mm:ss') : '';
        return;
      }
      const [, time] = value.split(' ');
      this.timeModel = time !== '00:00:00' ? time : '';
      return;
    }

    this.timeModel = '';
  }

  emitValue (dateModel: string, timeModel: string = '00:00:00') {
    const date = dateModel;
    const time = timeModel;

    if (date && time) {
      const parsedDate = parse(date, DATE_FORMAT, new Date());
      const dateValue = format(parsedDate, PICKER_DATE_FORMAT);

      this.$emit('input', appendTimezoneOffset(`${dateValue}T${time}`));
    } else {
      this.$emit('input', null);
    }
  }
}
</script>

<style lang="stylus">
.vt-datetime-picker {
  position: relative;

  & .v-label {
    transform-origin: top left;

    &--active {
      max-width: 133%;
      transform: translateY(0px) scale(0.75);
    }
  }
}
</style>
