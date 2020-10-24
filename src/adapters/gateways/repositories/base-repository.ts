import { Entity, UniqueEntityID } from '@entities';
import IdentityMap from '../identity-map';
import { MapperRegistry } from '../mapper-registry';
import { UnitOfWork } from '../unit-of-work';

export interface IRepository {
  startTransaction(): void;
  abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]>;
  abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>>;
  endTransaction(): Promise<void>;
  remove(e: Entity<any>): Promise<void>;
  removeCollection(entities: Entity<any>[]): Promise<void>;
  save(e: Entity<any>): Promise<void>;
  update(e: Entity<any>): Promise<void>;
  saveCollection(entities: Entity<any>[]): Promise<void>
}

export default class BaseRepository implements IRepository {
  protected uow: UnitOfWork | undefined;
  protected identityMap: IdentityMap

  constructor(...args: any[]) {
    this.identityMap = new IdentityMap();
  }

  public startTransaction() {
    this.uow = new UnitOfWork(this.identityMap);
  }

  public async abstractFind(entityName: string, id: UniqueEntityID): Promise<Entity<any>> {
    let entity = this.identityMap.load(entityName, id);

    if (!entity) {
      entity = await MapperRegistry.getEntiyMapper(entityName).find({ id: id.toValue() });
    }

    if(!entity) {
      return null;
    }

    this.identityMap.add(entity);
    return entity;
  }

  public async abstractFindAll(entityName: string, criteria: any): Promise<Entity<any>[]> {
    const reload = (entity: Entity<any>) => {
      const loaded = this.identityMap.load(entityName, entity.id);
      if (!loaded) {
        this.identityMap.add(entity);
        return entity;
      }
      return loaded;
    }
    console.log(`entities`)
    
    let entities = await MapperRegistry.getEntiyMapper(entityName).findAll(criteria);
    console.log(`entities ${JSON.stringify(entities)}`)
    
    for (let i = 0; i < entities.length; i++) {
      entities[i] = reload(entities[i]);
    }
    
    console.log(`entities-222- ${JSON.stringify(entities)}`)
    return entities;
  }

  public async save(e: Entity<any>) {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }

    const entityName = e.constructor.name;
    console.log('1')
    console.log(e.id)
    const registered = this.identityMap.load(entityName, e.id);
    console.log('3')
    if (registered) {
      this.uow.registerDirty(e);
    } else {
      console.log(`4`)
      this.uow.registerNew(e);
      console.log(`11`)
    }
  }
  
  public async update(e: Entity<any>) {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }
    this.uow.registerDirty(e);
  }

  public async saveCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.save(e);
    }
  } 

  public async remove(e: Entity<any>) {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }
    
    this.uow.registerRemoved(e);
  }

  public async removeCollection(entities: Entity<any>[]) {
    for (const e of entities) {
      this.remove(e);
    }
  }

  public async endTransaction() {
    if (!this.uow) {
      throw new Error('There is no started transaction');
    }
    console.log(`13`)
    await this.uow.commit();
    console.log(`Depois do commit`)
    this.uow = undefined;
  }
}

type GConstructor<T = {}> = new (...args: any[]) => T;
export type Repository = GConstructor<IRepository>;