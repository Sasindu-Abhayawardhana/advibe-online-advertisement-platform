import {UserRepositoryImpl} from "./custom/impl/user.repository.impl.js";
import {PoolClient} from "pg";
import {ImageRepositoryImpl} from "./custom/impl/image.repository.impl.js";
import {AdRepositoryImpl} from "./custom/impl/ad.repository.impl.js";
import {SuperRepository} from "./super.repository.js";
import {QueryRepositoryImpl} from "./custom/impl/query.repository.impl.js";

export enum RepositoryType {
    AD, USER, IMAGE, QUERY
}

export class FactoryRepository {

    // Return the same Factory Instance with all
    private static readonly INSTANCE: FactoryRepository = new FactoryRepository();

    private constructor() {
    }

    // First need to get the instance of the factory
    static getInstance(): FactoryRepository {
        return FactoryRepository.INSTANCE;
    }

    // the need to get the repository by passing repository and client connection
    getRepository(type: RepositoryType, connection: PoolClient): SuperRepository | null {
        switch (type) {
            case RepositoryType.USER:
                return new UserRepositoryImpl(connection);
            case RepositoryType.IMAGE:
                return new ImageRepositoryImpl(connection);
            case RepositoryType.AD:
                return new AdRepositoryImpl(connection);
            case RepositoryType.QUERY:
                return new QueryRepositoryImpl(connection);
            default:
                return null;
        }
    }

}