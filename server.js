import express from 'express';

const app = express();


const data = require('./data.json');

app.get('/api/planets', (req, res) => {
    res.json(data);
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});


const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://czszlxsb:SlC6QED2yrd3iMvVnNicyACszb-8KmJH@flora.db.elephantsql.com/czszlxsb',
    ssl: {
        rejectUnauthorized: false
    }
});
