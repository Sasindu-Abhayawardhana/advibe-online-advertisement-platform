import {QueryRepository} from "../query.repository.js";
import {PoolClient} from "pg";

export class QueryRepositoryImpl implements QueryRepository{

    constructor(private connection: PoolClient) {
    }
}