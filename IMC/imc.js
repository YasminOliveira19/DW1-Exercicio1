function funcaoCalcular(){
    let peso=parseFloat(document.getElementById("inputpeso").value);
    let altura=parseFloat(document.getElementById("inputaltura").value);
    let IMC= "";

    IMC = peso / (altura * altura)
    
    let footer = document.getElementById("footer");
    let mensagem = document.getElementById("mensagem");

    if (IMC < 18.5) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Abaixo do peso";
        document.getElementById("saida").innerHTML =IMC;
       
    } else  if (IMC < 24.9) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Peso normal";
        document.getElementById("saida").innerHTML =IMC;

    } else  if (IMC < 29.9) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Sobrepeso";
        document.getElementById("saida").innerHTML =IMC;

    } else  if (IMC < 34.9) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Obesidade grau I";
        document.getElementById("saida").innerHTML =IMC;

    }  else  if (IMC < 39.9) {
        footer.classList.add("erro");
        mensagem.innerHTML = "Obesidade grau II";
        document.getElementById("saida").innerHTML =IMC;

    }else {
        footer.classList.add("erro");
        mensagem.innerHTML = "Obesidade grau III";
        document.getElementById("saida").innerHTML =IMC;
    }
}

    