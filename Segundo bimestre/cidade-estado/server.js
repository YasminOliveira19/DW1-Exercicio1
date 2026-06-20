const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota para listar todas as cidades
app.get('/cidades', async (req, res) => {
    try {
        const query = 'SELECT id_cidade, nome_cidade FROM public.cidade ORDER BY nome_cidade';
        const result = await pool.query(query);
        
        res.json({ 
            sucesso: true, 
            cidades: result.rows,
            quantidade: result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao listar cidades:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});


// Rota para buscar cidade 
app.get('/cidade-estado', async (req, res) => {
    try {
              
        const query = 'SELECT id_cidade, nome_cidade, sigla_estado FROM public.cidade ORDER BY nome_cidade';
        const result = await pool.query(query);
        
        res.json({ 
            sucesso: true, 
            cidades: result.rows,
            quantidade: result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao listar cidades:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});

// Rota para buscar cidade por nome 
app.get('/cidade/nome/', async (req, res) => {
    try {
        const { nome } = req.params;
        
        const query = 'SELECT id_cidade, nome_cidade FROM public.cidade WHERE nome_cidade ILIKE $1';
        const result = await pool.query(query, [`%${nome}%`]); // Usa ILIKE para busca case-insensitive e % para busca de substring. O % é um curinga que permite encontrar qualquer cidade cujo nome contenha a string fornecida, independentemente de onde ela apareça no nome. O uso de ILIKE torna a busca insensível a maiúsculas e minúsculas, permitindo encontrar "Maria", "maria", "MARIA", etc.
        
        if (result.rows.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: 'Nenhuma cidade encontrada com este nome' 
            });
        }
        
        res.json({ 
            sucesso: true, 
            cidades: result.rows,
            quantidade: result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao buscar por nome:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});


const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
    console.log(`Rotas disponíveis:`);
    console.log(`  GET http://${ip}:${port}/cidades - Listar todas as cidades`);
    console.log(`  GET http://${ip}:${port}/cidade-estado - Listar todas as cidades e seus estados`);
    console.log(`  GET http://${ip}:${port}/cidade/nome/ - Buscar por nome`);
});