function funcaoCalcular(){
        let RA=parseFloat(document.getElementById("inputra").value);
        let nome=document.getElementById("inputnome").value;
        let Nota1=parseFloat(document.getElementById("inputn1").value);
        let Nota2=parseFloat(document.getElementById("inputn2").value);
        let Nota3=parseFloat(document.getElementById("inputn3").value);
        let Nota4=parseFloat(document.getElementById("inputn4").value);
        let ME=parseFloat(document.getElementById("inputme").value);
        let MA="";
        let conceito="";
        let sit="";

  if (!RA || !nome || !Nota1 || !Nota2 || !Nota3 || !Nota4 || !ME) {
    document.getElementById("mensagem").innerText = "Preencha todos os campos!";
    return;}

    if (
    Nota1 < 0 || Nota1 > 100 ){
        mensagem.innerHTML = " Nota 1 deve estar entre 0 e 100! ";
        return
    } else if (
    Nota2 < 0 || Nota2 > 100 ){
        mensagem.innerHTML = " Nota 2 deve estar entre 0 e 100! ";
        return
    } else if (
    Nota3 < 0 || Nota3 > 100 ){
        mensagem.innerHTML = " Nota 3 deve estar entre 0 e 100! ";
        return
    } else if(
    Nota4 < 0 || Nota4 > 100) {
        mensagem.innerHTML = " Nota 4 deve estar entre 0 e 100! ";
        return
    }
    
    


        MA = (Nota1 + Nota2 * 2 + Nota3 * 3 + Nota4 * 4 + ME )/11;

        if (MA>= 9.0) {
            conceito="A";
        } else if (MA>=7.5) {
            conceito="B";
        } else if (MA>=6.0) {
            conceito="C";
        } else if (MA>=4.0) {
            conceito="D";
        } else {
            conceito="E";
        }

        if (conceito=="A"||conceito=="B"||conceito=="C") {
            sit= "APROVADO";
        } else {
            sit="REPROVADO";
        }

      

        let resp="RA:" + RA + "<br>"  + 
        "Nome:" + nome + "<br>" + 
        "Nota 1:" + Nota1 + "<br>" +
        "Nota 2:" + Nota2 + "<br>" +
        "Nota 3:" + Nota3 + "<br>" +
        "Nota 4:" + Nota4 + "<br>"  +
        "Média exercícios:" + ME + "<br>" +
        "Média:" + MA.toFixed(2) + "<br>" +
        "Conceito:" + conceito + "<br>" +
        "Situação:" + sit + "<br>";
 
document.getElementById("saida").innerHTML = resp;
}


    
    