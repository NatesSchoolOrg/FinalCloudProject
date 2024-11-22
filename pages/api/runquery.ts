import { NextApiRequest, NextApiResponse } from 'next';
import sql from 'mssql';

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(query);
        res.status(200).json(result.recordset);
        await pool.close();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
}
