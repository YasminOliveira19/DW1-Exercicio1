const express = require('express');
const os = require('os');
const fs = require('fs');
const multer = require('multer');

const app = express();
const port = 3000;

// Pasta onde as imagens serão salvas
const pastaImagens = './imagens/';

// Cria a pasta caso não exista
if (!fs.existsSync(pastaImagens)) {
    fs.mkdirSync(pastaImagens, { recursive: true });
}

// ---------------------------------------------------
// CONFIGURAÇÃO DO MULTER
// ---------------------------------------------------

// Define o destino da imagem
function definirDestino(req, file, callback) {
    callback(null, pastaImagens);
}

// Define o nome do arquivo
function definirNomeArquivo(req, file, callback) {

    const cpf = req.body.cpf || 'sem-cpf';

    const nomeArquivo = cpf + '.png';

    callback(null, nomeArquivo);
}

// Configuração do armazenamento
const armazenamento = multer.diskStorage({
    destination: definirDestino,
    filename: definirNomeArquivo
});

// Middleware do multer
const upload = multer({
    storage: armazenamento
});

// ---------------------------------------------------
// MIDDLEWARES
// ---------------------------------------------------

app.use(express.json());

// Middleware CORS
app.use(function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');

    res.header(
        'Access-Control-Allow-Methods',
        'POST, GET, OPTIONS'
    );

    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    next();
});

// ---------------------------------------------------
// ROTA PRINCIPAL
// ---------------------------------------------------

app.post('/enviar-dados', upload.single('foto'), function (req, res) {

    try {

        const cpf = req.body.cpf;
        const nome = req.body.nome;

        const peso = parseFloat(req.body.peso);
        const altura = parseFloat(req.body.altura);

        // Validações
        if (!cpf || !nome) {

            return res.status(400).json({
                erro: 'CPF e Nome são obrigatórios.'
            });
        }

        if (isNaN(peso) || isNaN(altura)) {

            return res.status(400).json({
                erro: 'Peso e altura devem ser números.'
            });
        }

        // Fórmula correta do IMC
        const imc = peso / (altura * altura);

        let situacao = '';

        // Classificação do IMC
        if (imc < 16.0) {

            situacao = 'Magreza grave';

        } else if (imc <= 16.9) {

            situacao = 'Magreza moderada';

        } else if (imc <= 18.4) {

            situacao = 'Magreza leve';

        } else if (imc <= 24.9) {

            situacao = 'Saudável';

        } else if (imc <= 29.9) {

            situacao = 'Sobrepeso';

        } else if (imc <= 34.9) {

            situacao = 'Obesidade Grau I';

        } else if (imc <= 39.9) {

            situacao = 'Obesidade Grau II';

        } else {

            situacao = 'Obesidade Grau III (mórbida)';
        }

        // Exibe no terminal
        console.log('--------------------------------');
        console.log('Cliente:', nome);
        console.log('CPF:', cpf);
        console.log('IMC:', imc.toFixed(2));
        console.log('Situação:', situacao);

        if (req.file) {

            console.log(
                'Imagem salva:',
                req.file.filename
            );
        }

        // Resposta para o cliente
        res.json({

            mensagem: 'Dados processados com sucesso!',

            nomeArquivo: req.file
                ? req.file.filename
                : null,

            cliente: {
                cpf: cpf,
                nome: nome,
                imc: imc.toFixed(2),
                situacao: situacao
            }
        });

    } catch (erro) {

        console.log('Erro:', erro);

        res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }
});

// ---------------------------------------------------
// FUNÇÃO PARA OBTER O IP
// ---------------------------------------------------

function obterIP() {

    const interfaces = os.networkInterfaces();

    for (let nomeInterface in interfaces) {

        for (let info of interfaces[nomeInterface]) {

            if (
                info.family === 'IPv4' &&
                !info.internal
            ) {

                return info.address;
            }
        }
    }

    return 'localhost';
}

const ip = obterIP();

// ---------------------------------------------------
// INICIA O SERVIDOR
// ---------------------------------------------------

app.listen(port, '0.0.0.0', function () {

    console.log(`Servidor rodando em http://${ip}:${port}`);

    console.log('Pasta das imagens:', pastaImagens);
});