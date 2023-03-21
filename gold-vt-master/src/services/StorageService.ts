const prefixFromEnv = import.meta.env.VITE_STORAGE_PREFIX || 'vt_';

class StorageService {
  private storage: typeof localStorage;

  constructor (private prefix: string = prefixFromEnv) {
    /* todo: fallback for storage */
    this.storage = localStorage || {
      getItem (key: string | null): void {
        // eslint-disable-next-line no-console
        console.warn(`Trying to get key ${key} from fallback storage`);
      },
      setItem (key: string, value: string): void {
        // eslint-disable-next-line no-console
        console.warn(`Trying to set ${key}:${value} to fallback storage`);
      }
    } as Storage;
  }

  private getKeyName (key: string) {
    return `${this.prefix}${key}`;
  }

  get (key: string) {
    try {
      return JSON.parse(String(this.storage.getItem(this.getKeyName(key))));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  set (key: string, value: any) {
    try {
      return this.storage.setItem(this.getKeyName(key), JSON.stringify(value));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  remove (key: string) {
    return this.storage.removeItem(this.getKeyName(key));
  }
}

export default new StorageService();
