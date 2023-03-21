import { observable } from 'mobx';

class EntityCacheService {
  @observable store: Map<string, Map<string, any>> = new Map();

  set (entity: string, object: any) {
    let entityMap = this.store.get(entity);
    if (!entityMap) {
      entityMap = new Map<string, Record<string, any>>();
      this.store.set(entity, entityMap);
    }

    if (object.id) {
      entityMap.set(String(object.id), object);
    }
  }

  get (entity: string, id: string | number) {
    const entityMap = this.store.get(entity);
    return entityMap ? entityMap.get(String(id)) : undefined;
  }
}

export default new EntityCacheService();
