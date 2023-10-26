import express from 'express';
// import { Pool } from 'pg';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const path = require("path");

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


app.get('/api/planets/:planetName', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM planets WHERE LOWER(name) = LOWER($1)', [req.params.planetName]);
        const planet = result.rows[0];

        if (!planet) {
            res.status(404).send("Planet not found");
            return;
        }

        client.release();
        res.json(planet);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).send("Error fetching data");
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



app.use(express.static(path.join(__dirname, "planets-fact-frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./planets-fact-frontend/build", "index.html"));
});