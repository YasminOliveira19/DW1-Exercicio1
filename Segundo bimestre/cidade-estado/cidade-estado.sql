DROP TABLE IF EXISTS cidade;
DROP TABLE IF EXISTS estado;

CREATE TABLE estado (
    sigla_estado CHAR(2) PRIMARY KEY,
    nome_estado VARCHAR(50) NOT NULL
);

CREATE TABLE cidade (
    id_cidade SERIAL PRIMARY KEY,
    nome_cidade VARCHAR(50) NOT NULL,
	sigla_estado  CHAR(2),
    FOREIGN KEY (sigla_estado) REFERENCES estado(sigla_estado)
);

-- Inserts para todos os estados do Brasil
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('AC', 'Acre');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('AL', 'Alagoas');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('AP', 'Amapá');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('AM', 'Amazonas');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('BA', 'Bahia');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('CE', 'Ceará');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('DF', 'Distrito Federal');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('ES', 'Espírito Santo');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('GO', 'Goiás');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('MA', 'Maranhão');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('MT', 'Mato Grosso');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('MS', 'Mato Grosso do Sul');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('MG', 'Minas Gerais');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PA', 'Pará');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PB', 'Paraíba');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PR', 'Paraná');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PE', 'Pernambuco');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('PI', 'Piauí');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('RJ', 'Rio de Janeiro');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('RN', 'Rio Grande do Norte');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('RS', 'Rio Grande do Sul');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('RO', 'Rondônia');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('RR', 'Roraima');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('SC', 'Santa Catarina');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('SP', 'São Paulo');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('SE', 'Sergipe');
INSERT INTO estado (sigla_estado, nome_estado) VALUES ('TO', 'Tocantins');

-- Inserts para 15 cidades da região de Campo Mourão (Paraná)
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Campo Mourão', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Pequeno', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Mamborê', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Fênix', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Juranda', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Boa Esperança', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Araruna', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Barbosa Ferraz', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Iretama', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Janiópolis', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Luiziana', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Moreira Sales', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Nova Cantu', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Quarto Centenário', 'PR');
INSERT INTO cidade (nome_cidade, sigla_estado) VALUES ('Tuneiras do Oeste', 'PR');