import { YGEO_API_KEY } from '@/consts/yandex';

export class YandexGeoCodeService {
  buildQueryString (query: string): string {
    return `https://geocode-maps.yandex.ru/1.x/?apikey=${YGEO_API_KEY}&format=json&geocode=${encodeURIComponent(query)}`;
  }

  async search (string: string) {
    const res = await fetch(this.buildQueryString(string));
    if (res && res.ok) {
      const { response } = await res.json();
      return response;
    }
  }
}

export default new YandexGeoCodeService();
