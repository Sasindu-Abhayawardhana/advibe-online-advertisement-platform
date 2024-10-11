import pg from 'pg'
import 'dotenv/config';

const {Pool} = pg;

export const pool = new Pool({
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT']!,
    max: +(process.env["DB_POOL_MAX_CONNECTIONS"] ?? 10)


});

export async function ping() {
    const connection = await pool.connect();
    connection.release();
}