const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};


// Connect to the database and query
export async function connectToDatabase(query:string) {
    try {
        // Establish connection
        const pool = await sql.connect(config);
        console.log('Connected to SQL Server');

        // Example query
        const result = await pool.request().query(query);
        console.log(result.recordset);

        // Close the connection
        await sql.close();
    } catch (err) {
        console.error('Database connection error:', err);
    }
}