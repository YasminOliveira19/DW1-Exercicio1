class Carro {
    constructor(id_carro, nome_carro, modelo_carro, ano, posicaoNaLista) {
        this.id_carro = id_carro;
        this.nome_carro = nome_carro;
        this.modelo_carro = modelo_carro;
        this.ano = ano;

        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}