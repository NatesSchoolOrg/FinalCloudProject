import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/database-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password, email } = req.body;

        try {
            // Connect to the database
            const result = await connectToDatabase('SELECT * FROM users WHERE username = @username');

            if (result.recordset.length === 0) {
                return res.status(401).json({ message: 'User not found' });
            }

            const user = result.recordset[0];

            // Compare the hashed password with the input password
            const passwordMatch = password === user.password;
            const emailMatch = email === user.email;

            if (!passwordMatch || !emailMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Successfully authenticated
            return res.status(200).json({ message: 'Login successful', user });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}