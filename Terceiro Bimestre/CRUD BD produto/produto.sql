DROP TABLE IF EXISTS public.produto;
CREATE TABLE public.produto(
    id_produto INTEGER PRIMARY KEY,
    nome_produto VARCHAR(30) NOT NULL,
	tamanho_produto CHAR (1),
	peso FLOAT
);

INSERT INTO public.produto (id_produto, nome_produto, tamanho_produto, peso) VALUES
(1, 'Lavanda', 'P', 100),
(2, 'Baunilha', 'M', 200),
(3, 'Canela', 'G', 300),
(4, 'Rosas', 'M', 200),
(5, 'Capim-limao', 'P', 100);