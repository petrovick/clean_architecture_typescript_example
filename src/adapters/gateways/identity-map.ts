import { Entity, UniqueEntityID } from '@entities';

interface EntityMap {
  [entity: string]: Entity<any>[]
};

export default class IdentityMap {
  private _map: EntityMap;

  constructor() {
    this._map = {};
  }

  public load(entityName: string, id: UniqueEntityID): Entity<any> {
    console.log('2')
    

    if (!this._map[entityName])  return;

    const filtered = this._map[entityName].filter((e: Entity<any>) => {
      return e.id.equals(id);
    });
    
    return filtered[0];
  }

  public add(entity: Entity<any>) {
    console.log(`entity::${entity}`)
    const entityName = entity.constructor.name;
    console.log(`6`)
    const registered = this.load(entityName, entity.id);
    console.log(`7`)
    
    if (registered) {
      throw new Error(`${entityName} of ID ${entity.id} alread registered in Identity Map`);
    }
    console.log(`8`)

    if (this._map[entityName]) {
      this._map[entityName].push(entity);
    } else {
      this._map[entityName] = [entity];
    }
    console.log(JSON.stringify(this._map))
    console.log(`9`)
  }

  public remove(entity: Entity<any>) {
    const entityName = entity.constructor.name;

    this._map[entityName] = this._map[entityName].filter((e: Entity<any>) => {
      return !e.equals(entity);
    })
  }
}