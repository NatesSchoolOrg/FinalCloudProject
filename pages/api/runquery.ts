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
    const { query, params } = req.body;

    try {
        if (!query || typeof query !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing query string' });
        }

        const pool = await sql.connect(config);
        const request = pool.request();

        if (params && typeof params === 'object') {
            for (const [key, value] of Object.entries(params)) {
                request.input(key, value);
            }
        }

        const result = await request.query(query);
        res.status(200).json(result.recordset);

        await pool.close();
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed', details: error.message });
    }
}
