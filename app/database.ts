import sql, { pool } from 'mssql';
require('dotenv').config();

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

let connection: sql.ConnectionPool;
try {
    connection = await sql.connect(config);
} catch (err) {
    console.error(`Failed to connect to the database: ${err}`)
}

export async function runquery(query: string): Promise<sql.IResult<any> | void>{
    try {
        return connection.request().query(query)
    } catch (err) {
        console.error(`Error while running the query: ${err}`)
    }
    
}
