 function funcaoTotal(){

let quantcacbasico = parseInt(document.getElementById("inputcb").value) || 0;
let quantcacduplo = parseInt(document.getElementById("inputcd").value) || 0;
let quantsalada = parseInt(document.getElementById("inputs").value) || 0;
let quantrefrip = parseInt(document.getElementById("inputrp").value) || 0;
let quantrefrig = parseInt(document.getElementById("inputrg").value) || 0;

let cacbasico= 22.00;
let cacduplo= 26.00;
let salada= 29.00;
let refrip= 5.00;
let refrig= 8.00;

if (quantcacbasico < 0 || quantcacduplo < 0 || quantsalada < 0 || quantrefrip < 0 || quantrefrig < 0) {
    document.getElementById("saida").innerText = "Não é permitido quantidade negativa!";
    return;
}

let valor= quantcacbasico * cacbasico +
quantcacduplo * cacduplo +
quantsalada * salada +
quantrefrip * refrip +
quantrefrig * refrig;


 document.getElementById("saida").innerText =
        "O valor total é R$ " + valor.toFixed(2);

}