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

function desenharLista() {
  const lista = document.getElementById("lista-palavras");
  lista.innerHTML = "";
  palavras.forEach(p => {
    const span = document.createElement("span");
    span.className = "palavra";
    span.id = "palavra-" + p;
    span.textContent = p;
    lista.appendChild(span);
  });
}

function desenharGrade() {
  const el = document.getElementById("cruzada");
  el.innerHTML = "";
  el.style.setProperty("--colunas", TAMANHO);

  for (let l = 0; l < TAMANHO; l++) {
    for (let c = 0; c < TAMANHO; c++) {
      const div = document.createElement("div");
      div.className = "celula";
      div.textContent = grade[l][c];
      div.dataset.l = l;
      div.dataset.c = c;
      div.addEventListener("click", () => aoClicar(l, c));
      el.appendChild(div);
    }
  }
}

function pegarCelula(l, c) {
  return document.querySelector(`.celula[data-l="${l}"][data-c="${c}"]`);
}

function aoClicar(l, c) {
  // 1º clique: só marca a célula
  if (!primeiraCelula) {
    primeiraCelula = { l, c };
    pegarCelula(l, c).classList.add("selecionada");
    return;
  }

  // 2º clique: tenta validar
  const { l: l1, c: c1 } = primeiraCelula;
  pegarCelula(l1, c1).classList.remove("selecionada");
  primeiraCelula = null;

  const difL = l - l1;
  const difC = c - c1;

  // Só vale linha reta: horizontal, vertical ou diagonal
  const valido = difL === 0 || difC === 0 || Math.abs(difL) === Math.abs(difC);
  if (!valido) return;

  const passos = Math.max(Math.abs(difL), Math.abs(difC));
  const dl = Math.sign(difL);
  const dc = Math.sign(difC);

  let texto = "";
  const caminho = [];
  for (let i = 0; i <= passos; i++) {
    const nl = l1 + dl * i;
    const nc = c1 + dc * i;
    texto += grade[nl][nc];
    caminho.push([nl, nc]);
  }

  const invertido = texto.split("").reverse().join("");
  const achou = palavras.find(p => p === texto || p === invertido);

  if (achou && !encontradas.has(achou)) {
    encontradas.add(achou);
    caminho.forEach(([cl, cc]) => pegarCelula(cl, cc).classList.add("achada"));
    document.getElementById("palavra-" + achou).classList.add("riscada");

    if (encontradas.size === palavras.length) {
      document.getElementById("mensagem").textContent =
        "Parabéns! Você encontrou todas as palavras!";
    }
  }
}