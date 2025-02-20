function validarCartaoCredito(numero) {
    const bandeiras = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        AmericanExpress: /^3[47][0-9]{13}$/,
        DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        EnRoute: /^(?:2014|2149)\d{11}$/,
        Voyager: /^8699[0-9]{11}$/,
        HiperCard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        Aura: /^50[0-9]{14,17}$/
    };

    function validarLuhn(numero) {
        let soma = 0;
        let alternar = false;
        for (let i = numero.length - 1; i >= 0; i--) {
            let n = parseInt(numero.charAt(i), 10);
            if (alternar) {
                n *= 2;
                if (n > 9) {
                    n -= 9;
                }
            }
            soma += n;
            alternar = !alternar;
        }
        return (soma % 10) === 0;
    }

    for (let bandeira in bandeiras) {
        if (bandeiras[bandeira].test(numero)) {
            return {
                bandeira: bandeira,
                valido: validarLuhn(numero)
            };
        }
    }

    return {
        bandeira: 'desconhecida',
        valido: false
    };
}

// Exemplo de uso:
const numeroCartao = '4916978613468331';
const resultado = validarCartaoCredito(numeroCartao);
console.log(`Válido: ${resultado.valido}, Bandeira: ${resultado.bandeira}`);