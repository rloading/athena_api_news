const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // Para usar o HTML

const API_KEY = 'a664c18e055f4da499231225a998d7a8';
const PORT = 3000;


// Buscar as notícias
app.get('/api/news', async function (req, res) {

    const query = req.query.q || 'Brasil'; // Valor padrão

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=5&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`);
        const data = await response.json();
        res.json(data.articles);

        console.log(data.articles);
        console.log('termo: ' + query);

        let jsonContent = JSON.stringify(data.articles, null, 2);
        fs.writeFileSync('search_news.json', jsonContent);
        

    } 
    
    catch (error) {
        
        res.status(500).json({ error: 'Erro ao buscar notícias' });

    }
    
});

app.listen(PORT, function () {
    console.log('Servidor rodando na porta ' + PORT);
});
