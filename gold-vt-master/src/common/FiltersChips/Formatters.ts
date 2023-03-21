import STATUSES from '@/consts/status';
import EntityCacheService from '@/services/EntityCacheService';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const statusIdChipFormatter = (v: number | string) => {
  const status = STATUSES.find(s => s.value === v);
  return status ? status.text : '?';
};

export const parentCategoryIdFormatter = (v: number | string) => {
  const cached = EntityCacheService.get('category', v);
  return cached ? cached.title : '--';
};

export const dateFormatter = (dateString: string) => {
  if (!dateString) {
    return '--';
  }
  const date = parseISO(dateString);
  return format(date, 'dd.MM.yyyy HH:mm');
};

export default {
  statusId: statusIdChipFormatter,
  parentCategoryId: parentCategoryIdFormatter,
  createdAtFrom: dateFormatter,
  createdAtTo: dateFormatter
} as Record<string, any>;
