import express from 'express';
// import { Pool } from 'pg';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM planets');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.send("Error fetching data");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
