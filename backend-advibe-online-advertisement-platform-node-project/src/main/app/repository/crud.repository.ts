
// give interface to do the db operation
export interface CrudRepository<T, PK> {
    count(): Promise<number>;

    save(entity: T): Promise<PK>;

    update(entity: T): Promise<void>;

    deleteById(pk: PK): Promise<void>;

    findById(pk: PK): Promise<T>;

    findAll(): Promise<Array<T>>;

    existsById(pk: PK): Promise<boolean>;
}