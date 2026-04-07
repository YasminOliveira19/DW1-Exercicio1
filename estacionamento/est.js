function funcaoCalcular(){
        let horas=parseFloat(document.getElementById("inputh").value);
        let carro=document.getElementById("inputc").checked;
        let cliente=document.getElementById("inputcli").checked;
        let dias = Math.floor(horas / 24);
        let resto = horas % 24;
        let valor="";

    if (horas >= 24) {
        
        valor = dias * 60; // diária
        valor = valor + (resto * 2.5); // horas extras

    } else {
        if (horas > 0) {
            valor = 5; // primeira hora

            if (horas > 1) {
                valor = valor + ((horas - 1) * 2.5);
            }
        }
    }

    if (carro) {
        valor = valor + (valor * 0.25);
    }

    if (cliente) {
        valor = valor - (valor * 0.05);
    }

    document.getElementById("saida").innerText =
        "O valor total é R$ " + valor.toFixed(2);

    }

