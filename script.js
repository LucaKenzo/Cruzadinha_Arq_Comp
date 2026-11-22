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

function colocarPalavras() {
    
}