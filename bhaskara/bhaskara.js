 function funcaoCalcular(){
        let a=parseFloat(document.getElementById("inputValor").value);
        let b=parseFloat(document.getElementById("inputValorb").value);
        let c=parseFloat(document.getElementById("inputValorc").value);
   
        let delta = (b * b) - (4 * a * c);
 if (delta < 0) {
        document.getElementById("saida").innerHTML = "Sem raízes reais";
        document.getElementById("saida2").innerHTML = "";
        return;
    }
    
         let x1 = (-b + Math.sqrt(delta)) / (2 * a);
         let x2 = (-b - Math.sqrt(delta)) / (2 * a);

        document.getElementById("saida").innerHTML = x1;
        document.getElementById("saida2").innerHTML = x2;
    }