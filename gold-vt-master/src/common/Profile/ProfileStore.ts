import { observable } from 'mobx';
import { IUserProfile } from '@/services/api/factory';
import ApiService from '@/services/api';

class ProfileStore {
  @observable userProfile!: IUserProfile;

  async get () {
    try {
      const result = await ApiService.api.auth.profile();
      if (result) {
        this.userProfile = result;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

export default new ProfileStore();
