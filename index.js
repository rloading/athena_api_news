const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.static('public')); // Para usar o HTML

const API_KEY = process.env.NEWS_API_KEY;

// Buscar as notícias
app.get('/api/news', async function (req, res) {
    const query = req.query.q || ''; // Valor padrão
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&pageSize=10&language=pt&apiKey=${API_KEY}`);
        res.json(response.data.articles);
        console.log('termo: ' + query)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar notícias' });
    }
    
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
    console.log('Servidor rodando na porta ' + PORT);
});

