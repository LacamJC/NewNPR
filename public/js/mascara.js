const campoTEL = document.getElementById('FloatingTel');

campoTEL.addEventListener('input', () => {
    let value = campoTEL.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 10) {
        campoTEL.value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        campoTEL.value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
});

const campoCPF = document.getElementById('FloatingCPF');


campoCPF.addEventListener('input', () => {
    console.log("MÁSCARA DO CPF EM AÇÃO");
    let value = campoCPF.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 10) {
        campoCPF.value = value.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else {
        campoCPF.value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    }
});

const campoCEP = document.getElementById('floatingCep')

campoCEP.addEventListener('input', () => {
    console.log("MASCARA DO CEP EM")
    let value = campoCEP.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length === 8) {
        campoCEP.value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
});