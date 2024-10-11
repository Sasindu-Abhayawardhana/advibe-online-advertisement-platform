import {AdRepository} from "../ad.repository.js";
import {PoolClient} from "pg";
import {AdEntity} from "../../../entity/ad.entity.js";

export class AdRepositoryImpl implements AdRepository{
    constructor(private connection: PoolClient) {
    }

    async count(): Promise<number> {
        const {rowCount} = await this.connection.query('SELECT * FROM ad');
        return rowCount!;
    }

    async save(ad: AdEntity): Promise<number> {
        console.log(ad.title, ad.description, ad.postedDate, ad.userEmail);
        const {rows}= await this.connection.query('INSERT INTO ad (title, description, posted_date, user_email) VALUES ($1, $2, $3, $4) RETURNING id',
            [ad.title, ad.description, ad.postedDate, ad.userEmail]);
        ad = rows[0];
        console.log("result",ad.id);
        return ad.id;
    }

    async update(ad: AdEntity): Promise<void> {
        await this.connection.query('UPDATE "ad" SET title=$1, description=$2 WHERE id=$3',
            [ad.title, ad.description,ad.id]);
    }

    async deleteById(adId: number): Promise<void> {
        console.log("DELETE",adId);
        await this.connection.query('DELETE FROM "ad" WHERE id = $1', [adId]);
    }

    async findById(adId: number): Promise<AdEntity> {
        const {rows: [ad]} = await this.connection.query('SELECT * FROM "ad" WHERE id = $1',
            [adId]);
        return ad;
    }

    async findAll(): Promise<AdEntity[]> {
        const {rows} = await this.connection.query('SELECT * FROM ad JOIN "user" ON ad.user_email = "user".email');
        return rows;
    }

    async existsById(adId: number): Promise<boolean> {
        return (!!(await this.findById(adId)));
    }
}