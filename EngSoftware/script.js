class Tela {
    constructor(id) {
        this.element = document.getElementById(id);
    }

    show() {
        this.element.style.display = 'block';
    }

    hide() {
        this.element.style.display = 'none';
    }
}

class Tela1 extends Tela {
    constructor() {
        super('tela1');
        this.inputsTela1 = document.getElementById('inputsTela1');
        this.numeros = [];
        this.initialize();
    }

    initialize() {
        for (let i = 0; i < 8; i++) {
            const label = document.createElement('label');
            label.textContent = `Número ${i + 1}: `;
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `numero${i}`;
            input.required = true;
            this.inputsTela1.appendChild(label);
            this.inputsTela1.appendChild(input);
            this.inputsTela1.appendChild(document.createElement('br'));
        }
        document.getElementById('btnTela1').addEventListener('click', () => this.proceedToTela2());
    }

    proceedToTela2() {
        this.numeros = [];
        for (let i = 0; i < 8; i++) {
            const value = parseInt(document.getElementById(`numero${i}`).value);
            if (isNaN(value)) {
                alert('Por favor, insira apenas números inteiros.');
                return;
            }
            this.numeros.push(value);
        }
        this.numeros.sort((a, b) => a - b);
        localStorage.setItem('numeros', JSON.stringify(this.numeros));
        new Tela2().show();
        this.hide();
    }
}

class Tela2 extends Tela {
    constructor() {
        super('tela2');
        document.getElementById('btnTela2').addEventListener('click', () => this.buscarChave());
    }

    buscarChave() {
        const chave = parseInt(document.getElementById('chave').value);
        if (isNaN(chave)) {
            alert('Por favor, insira um número inteiro.');
            return;
        }

        const numeros = JSON.parse(localStorage.getItem('numeros'));
        let baixo = 0;
        let alto = numeros.length - 1;
        let meio;
        let encontrado = -1;

        while (baixo <= alto) {
            meio = Math.floor((baixo + alto) / 2);
            if (numeros[meio] === chave) {
                encontrado = meio;
                break;
            } else if (numeros[meio] < chave) {
                baixo = meio + 1;
            } else {
                alto = meio - 1;
            }
        }

        localStorage.setItem('resultadoBusca', encontrado);
        localStorage.setItem('chave', chave);
        window.location.href = 'tela3.html';
    }
}

class Tela3 extends Tela {
    constructor() {
        super('resultado');
        document.getElementById('btnTela3').addEventListener('click', () => this.voltarParaTela1());
        this.showResultado();
    }

    showResultado() {
        const resultado = localStorage.getItem('resultadoBusca');
        const chave = localStorage.getItem('chave');
        let mensagem;

        if (resultado === null) {
            mensagem = 'Nenhum resultado encontrado.';
        } else if (resultado === '-1') {
            mensagem = `A chave ${chave} não foi encontrada.`;
        } else {
            mensagem = `A chave ${chave} foi encontrada na posição ${resultado}.`;
        }

        document.getElementById('resultado').textContent = mensagem;
    }

    voltarParaTela1() {
        window.location.href = 'index.html';
    }
}

// Inicializa a Tela1 quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    new Tela1().show();
});