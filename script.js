const palavras = [
  "CPU", "ULA", "REGISTRADORES", "RAM", "ROM", "EPROM", "FLASH", "MASSA",
  "DMA", "CHIPSELECT", "ADRESSBUS", "DATABUS", "INTELCINCO", "INTELSETE",
  "DUALCORE", "QUADCORE"
];

const tamanho = 22;

const direcoes = [
  [0, 1],   
  [1, 0],   
  [1, 1],   
  [-1, 1],  
  [0, -1],  
  [-1, 0],  
  [-1, -1], 
  [1, -1]   
];

function criarCruzada() {
    let cruzada = [];

    for (let i = 0; i < tamanho; i++) {
        cruzada.push(Array(tamanho).fill(""));
    }
}

function podeColocar(palavra, l, c, dl, dc) {
    for (let i = 0; i < palavra.lenght; i++) {
        const linha = l + dl * i;
        const coluna = c + dc * i;

        if (linha < 0 || linha >= tamanho || coluna < 0 || coluna >= tamanho) return false;
        if (cruzada[linha][coluna] !== "" && cruzada[linha][coluna] !== palavra[i]) return false;
    }
    return true;
}

function colocarPalavras(palavra) {
    for (let tentativa = 0; tentativa < 300; tentativa++) {
        const [dl, dc] = direcoes[Math.floor(Math.random * direcoes.length)]
        const l = Math.floor(Math.random * tamanho);
        const c = Math.floor(Math.random * tamanho);
    
        if (podeColocar(palavra, l, c, dl, dc)) {
            for (let i = 0; i < palavra.lenght; i ++) {
                cruzada[l + dl * i][c + dc * i] = palavra[i];
            }
            return true;
        }
    }
    return false;
}

function preencherVazio() {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let l = 0; l < tamanho; l++){
        for (let c = 0; c < tamanho; c++) {
            if (cruzada[l][c] == "") {
                cruzada[l][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            }
        }
    }
}

