const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.use(express.json());

// Middleware CORS ajustado
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Rota Única: Processamento de Bilhetes baseados em regras de negócio
app.post('/api/mensagens', async (req, res) => {
    try {
        const mensagemRecebida = req.body.mensagem;

        if (!mensagemRecebida) {
            return res.status(400).json({ status: "erro", mensagem: "Bilhete vazio!" });
        }

        const agora = new Date();
        const dataHora = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR')}`;
        console.log(`[${dataHora}] Bilhete que passou pela floresta: "${mensagemRecebida}"`);

        // REGRA 1: Saudação
        if (mensagemRecebida === "vovó") {
            return res.status(200).json({
                status: "sucesso",
                mensagem: "Oi, em que posso ajudar?"
            });
        }

        // REGRA 2: Chegada
        else if (mensagemRecebida === "chegou") {
            return res.status(200).json({
                status: "sucesso",
                mensagem: "A Chapeuzinho chegou aqui com o bilhete!"
            });
        }

        // REGRA 3: Análise do Estoque (Dispensa Básica)
        else if (mensagemRecebida === "situacao") {
            try {
                const query = 'SELECT * FROM public.produto';
                const result = await pool.query(query);

                let reposicao = {};

                result.rows.forEach(produto => {
                    if (produto.quantidade_produto < produto.quantidade_minima_produto) {
                        const quantidadeParaPedir = produto.quantidade_maxima_produto - produto.quantidade_produto;
                        let nomeFormatado = produto.nome_produto.toLowerCase();
                        reposicao[nomeFormatado] = quantidadeParaPedir;
                    }
                });

                let mensagemResposta = "";
                const itens = Object.entries(reposicao);

                if (itens.length === 0) {
                    mensagemResposta = "Tudo ok! Nenhum item precisa ser reposto no momento.";
                } else {
                    mensagemResposta = "Precisamos repor urgentemente:\n";
                    itens.forEach(([item, quantidade]) => {
                        mensagemResposta += `• ${item}: ${quantidade} unidades\n`;
                    });
                }

                return res.status(200).json({
                    status: "sucesso",
                    mensagem: mensagemResposta,
                    dados_reposicao: reposicao 
                });

            } catch (dbError) {
                console.error('Erro ao abrir a dispensa (DB):', dbError);
                return res.status(500).json({
                    status: "erro",
                    mensagem: 'Erro ao consultar a Dispensa Básica (Banco de Dados)'
                });
            }
        }

        // REGRA 4: Caso o Lobo invente palavras ou digite algo incorreto
        else {
            return res.status(200).json({
                status: "erro",
                mensagem: `Mensagem "${mensagemRecebida}" não foi entendida pela Servidorina.`
            });
        }

    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ status: "erro", mensagem: 'Erro interno no servidor da Lojinha.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`👵 Servidorina escutando na porta ${port}`);
});