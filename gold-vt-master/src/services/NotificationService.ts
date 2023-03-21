import { action, computed, observable, reaction, toJS } from 'mobx';

export type NotificationQueueItem = {
  message: string;
  params?: Array<any>;
  raw?: boolean;
  color?: string;
  timeout?: number;
};

class NotificationService {
  @observable queue: Array<NotificationQueueItem> = [];
  @observable _notification = true;

  constructor () {
    reaction(
      () => {
        return this.queue;
      },
      () => {
        this._notification = toJS(this.queue).length > 0;
      }
    );

    /* dev only */
    // @ts-ignore
    window.addNotify = (message: string) => {
      this.add({
        message
      });
    };
  }

  @computed
  get notification () {
    return this._notification;
  }

  set notification (value: any) {
    this._notification = false;
    setTimeout(() => {
      this.queue = this.queue.slice(1);
    }, 500);
  }

  @computed
  get current () {
    return toJS(this.queue)[0];
  }

  @computed
  get isLast (): boolean {
    return toJS(this.queue).length <= 1;
  }

  @computed
  get queueLen (): number {
    return toJS(this.queue).length;
  }

  @action
  add (item: NotificationQueueItem) {
    this.queue.push(item);
    this._notification = true;
  }
}

export default new NotificationService();
