import { action, observable } from 'mobx';
import AuthService from '@/services/AuthService';

export class LoginStore {
  @observable login = '';
  @observable password = '';
  @observable remember = false;
  @observable formError = '';
  @observable isLoading = false;

  @action
  async send () {
    try {
      this.formError = '';
      this.isLoading = true;
      await AuthService.login({
        login: this.login,
        password: this.password,
        remember: this.remember
      });
      return true;
    } catch (err) {
      this.formError = err.message;
    } finally {
      this.isLoading = false;
    }
  }

  @action
  reset () {
    this.login = '';
    this.password = '';
    this.remember = false;
  }
}

export default new LoginStore();
