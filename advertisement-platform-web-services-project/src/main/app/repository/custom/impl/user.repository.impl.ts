import {UserEntity} from "../../../entity/user.entity.js";
import {UserRepository} from "../user.repository.js";
import {PoolClient} from "pg";

export class UserRepositoryImpl implements UserRepository {

    constructor(private connection: PoolClient) {
    }

    // Perform the DB operation
    async count(): Promise<number> {
        const {rowCount} = await this.connection.query('SELECT * FROM "user"');
        return rowCount!;
    }

    async save(user: UserEntity): Promise<string> {
        await this.connection.query('INSERT INTO "user" (email, name, contact) VALUES ($1, $2, $3)',
            [user.email, user.name, user.contact]);
        return user.email;
    }

    async update(user: UserEntity): Promise<void> {
        await this.connection.query('UPDATE "user" SET name=$1, contact=$2 WHERE email=$3',
            [user.name, user.contact, user.email]);
    }

    async deleteById(email: string): Promise<void> {
        await this.connection.query('DELETE FROM "user" WHERE email = $1', [email]);
    }

    async findById(email: string): Promise<UserEntity> {
        const {rows: [user]} = await this.connection.query('SELECT * FROM "user" WHERE email = $1',
            [email]);
        return user;
    }

    async findAll(): Promise<UserEntity[]> {
        const {rows} = await this.connection.query('SELECT * FROM "user"');
        return rows;
    }

    async existsById(email: string): Promise<boolean> {
        return (!!(await this.findById(email)));
    }


}