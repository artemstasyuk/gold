import Vue from 'vue';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import _get from 'lodash/get';
import { formatToAppTimezone } from '@/helpers/date';
import { pluralize } from '@/helpers/text';

Vue.filter('getField', function (
  object: { title: string },
  field: string = 'title',
  defaultValue: any = '--'
): string {
  return object ? _get(object, field, defaultValue) : defaultValue;
});

Vue.filter('getFieldOfList', (
  array: Array<{ title: string }>,
  field: string = 'title',
  defaultValue: any = '--',
  joinBy: string = ', '
): string => {
  return Array.isArray(array)
    ? array.map(i => _get(i, field, defaultValue)).join(joinBy)
    : defaultValue;
});

Vue.filter('tableDate', function (dateString: string, dateFormat: string = 'iso') {
  if (!dateString) {
    return '--';
  }
  let date, result;
  switch (dateFormat) {
    case 'iso': {
      result = formatToAppTimezone(dateString, 'dd.MM.yyyy HH:mm');
      break;
    }
    case 'date': {
      date = parse(dateString, 'dd.MM.yyyy', new Date());
      result = format(date, 'dd.MM.yyyy');
      break;
    }
    default: {
      date = parse(dateString, dateFormat, new Date());
      result = format(date, 'dd.MM.yyyy HH:mm');
    }
  }

  return result;
});

Vue.filter('formatDate', function (date: Date, formatting: string) {
  return format(date, formatting);
});

Vue.filter('pluralize', pluralize);
