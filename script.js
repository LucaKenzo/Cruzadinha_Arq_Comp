const LINHAS = 16;
const COLUNAS = 16;

const palavras = [
  { resposta: "MICROCONTROLADOR", linha: 6,  coluna: 0,  direcao: "H",
    pista: "Chip único com processador, memória e portas de entrada e saída, usado em Arduino." },
  { resposta: "REGISTRADORES",    linha: 0,  coluna: 15, direcao: "V",
    pista: "Pequenas memórias dentro do processador, as mais rápidas de todas." },
  { resposta: "MEMORIADEMASSA",   linha: 2,  coluna: 3,  direcao: "V",
    pista: "Guarda grandes volumes de dados de forma permanente, como HD ou SSD." },
  { resposta: "ADDRESSBUS",       linha: 4,  coluna: 13, direcao: "V",
    pista: "Via que carrega a posição da memória que será lida ou escrita." },
  { resposta: "DUALCORE",         linha: 12, coluna: 1,  direcao: "H",
    pista: "Processador com dois núcleos de execução no mesmo chip." },
  { resposta: "QUADCORE",         linha: 0,  coluna: 9,  direcao: "V",
    pista: "Processador com quatro núcleos de execução no mesmo chip." },
  { resposta: "DATABUS",          linha: 10, coluna: 7,  direcao: "H",
    pista: "Via por onde trafegam os valores lidos e escritos entre processador e memória." },
  { resposta: "EEPROM",           linha: 2,  coluna: 6,  direcao: "V",
    pista: "Memória não volátil regravável por sinais elétricos, com escrita e apagamento byte a byte." },
  { resposta: "CPU",              linha: 12, coluna: 5,  direcao: "V",
    pista: "Chip que busca, decodifica e executa as instruções dos programas." },
  { resposta: "ROM",              linha: 2,  coluna: 1,  direcao: "H",
    pista: "Memória não volátil gravada na fabricação, cujo conteúdo normalmente não é alterado." },
  { resposta: "DMA",              linha: 8,  coluna: 10, direcao: "V",
    pista: "Técnica que permite a periféricos trocar dados com a memória sem ocupar o processador." },
  { resposta: "CACHE",            linha: 2,  coluna: 8,  direcao: "H",
    pista: "Memória veloz entre processador e memória principal que guarda cópias de dados frequentes." },
  { resposta: "FLASH",            linha: 8,  coluna: 1,  direcao: "H",
    pista: "Memória não volátil regravável por blocos, usada em pen drives e cartões de memória." },
  { resposta: "ULA",              linha: 5,  coluna: 11, direcao: "V",
    pista: "Circuito do processador que faz as contas e as comparações lógicas." },
  { resposta: "UC",               linha: 4,  coluna: 8,  direcao: "H",
    pista: "Parte do processador que interpreta instruções e envia sinais de comando aos outros blocos." },
  { resposta: "RAM",              linha: 15, coluna: 2,  direcao: "H",
    pista: "Memória volátil onde ficam programas e dados em uso; perde tudo sem energia." }
];

function chave(l, c) {
  return l + "," + c;
}

function posicoesDaPalavra(p) {
  const lista = [];
  for (let i = 0; i < p.resposta.length; i++) {
    const l = p.linha + (p.direcao === "V" ? i : 0);
    const c = p.coluna + (p.direcao === "H" ? i : 0);
    lista.push([l, c]);
  }
  return lista;
}

function calcularNumeros(lista) {
  const inicios = new Set(lista.map(p => chave(p.linha, p.coluna)));
  const ordenados = [...inicios]
    .map(k => k.split(",").map(Number))
    .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  const numeros = {};
  ordenados.forEach(([l, c], i) => {
    numeros[chave(l, c)] = i + 1;
  });

  lista.forEach(p => {
    p.numero = numeros[chave(p.linha, p.coluna)];
  });
}

const tabuleiro = document.getElementById("tabuleiro");
const listaH = document.getElementById("pistas-horizontais");
const listaV = document.getElementById("pistas-verticais");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");

const celulas = {};
let direcaoAtual = "H";
let ativa = null;

function montarModelo() {
  palavras.forEach(p => {
    posicoesDaPalavra(p).forEach(([l, c], i) => {
      const k = chave(l, c);
      if (!celulas[k]) {
        celulas[k] = { solucao: p.resposta[i], palavras: { H: null, V: null } };
      }
      celulas[k].palavras[p.direcao] = p;
      if (i === 0) celulas[k].numero = p.numero;
    });
  });
}

function desenharTabuleiro() {
  tabuleiro.innerHTML = "";
  tabuleiro.style.setProperty("--colunas", COLUNAS);

  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      const cel = celulas[chave(l, c)];
      const div = document.createElement("div");

      if (!cel) {
        div.className = "bloco";
        tabuleiro.appendChild(div);
        continue;
      }

      div.className = "celula";

      if (cel.numero) {
        const n = document.createElement("span");
        n.className = "numero";
        n.textContent = cel.numero;
        div.appendChild(n);
      }

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.autocapitalize = "characters";
      input.spellcheck = false;
      input.setAttribute("aria-label", "Linha " + (l + 1) + ", coluna " + (c + 1));

      let jaEstavaAtiva = false;
      input.addEventListener("mousedown", () => {
        jaEstavaAtiva = ativa && ativa.l === l && ativa.c === c && document.activeElement === input;
      });
      input.addEventListener("click", () => {
        if (jaEstavaAtiva && cel.palavras.H && cel.palavras.V) {
          direcaoAtual = direcaoAtual === "H" ? "V" : "H";
          destacar();
        }
      });
      input.addEventListener("focus", () => aoFocar(l, c));
      input.addEventListener("input", () => aoDigitar(l, c));
      input.addEventListener("keydown", e => aoTeclar(e, l, c));

      div.appendChild(input);
      cel.div = div;
      cel.input = input;
      tabuleiro.appendChild(div);
    }
  }
}

function desenharPistas() {
  const ordenadas = [...palavras].sort((a, b) => a.numero - b.numero);

  ordenadas.forEach(p => {
    const li = document.createElement("li");
    li.tabIndex = 0;

    const num = document.createElement("strong");
    num.textContent = p.numero + ". ";

    const texto = document.createElement("span");
    texto.textContent = p.pista + " (" + p.resposta.length + ")";

    const status = document.createElement("span");
    status.className = "status";

    li.append(num, texto, status);

    const selecionar = () => {
      direcaoAtual = p.direcao;
      const [l, c] = posicoesDaPalavra(p)[0];
      irPara(l, c);
      destacar();
    };
    li.addEventListener("click", selecionar);
    li.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selecionar();
      }
    });

    p.li = li;
    (p.direcao === "H" ? listaH : listaV).appendChild(li);
  });
}

function irPara(l, c) {
  const cel = celulas[chave(l, c)];
  if (!cel) return false;
  cel.input.focus();
  return true;
}

function andar(l, c, passo) {
  const nl = l + (direcaoAtual === "V" ? passo : 0);
  const nc = c + (direcaoAtual === "H" ? passo : 0);
  return irPara(nl, nc);
}

function aoFocar(l, c) {
  ativa = { l, c };
  const cel = celulas[chave(l, c)];

  if (!cel.palavras[direcaoAtual]) {
    direcaoAtual = direcaoAtual === "H" ? "V" : "H";
  }
  destacar();
  setTimeout(() => cel.input.select(), 0);
}

function limparCasa(cel) {
  cel.div.classList.remove("certa", "errada");
}

function aoTeclar(e, l, c) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const cel = celulas[chave(l, c)];

  const setas = {
    ArrowRight: ["H", 0, 1],
    ArrowLeft: ["H", 0, -1],
    ArrowDown: ["V", 1, 0],
    ArrowUp: ["V", -1, 0]
  };

  if (setas[e.key]) {
    e.preventDefault();
    const [d, dl, dc] = setas[e.key];
    if (cel.palavras[d]) direcaoAtual = d;
    if (!irPara(l + dl, c + dc)) destacar();
    return;
  }

  if (e.key === "Backspace") {
    if (cel.input.value === "") {
      e.preventDefault();
      if (andar(l, c, -1)) {
        const anterior = celulas[chave(ativa.l, ativa.c)];
        anterior.input.value = "";
        limparCasa(anterior);
      }
    } else {
      limparCasa(cel);
    }
    return;
  }

  if (e.key.length === 1) {
    e.preventDefault();
    if (/^[a-zA-Z]$/.test(e.key)) {
      cel.input.value = e.key.toUpperCase();
      limparCasa(cel);
      andar(l, c, 1);
    }
  }
}

function aoDigitar(l, c) {
  const cel = celulas[chave(l, c)];
  const v = cel.input.value
    .normalize("NFD")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase()
    .slice(-1);

  cel.input.value = v;
  limparCasa(cel);
  if (v) andar(l, c, 1);
}

function destacar() {
  Object.values(celulas).forEach(cel => {
    cel.div.classList.remove("palavra-ativa", "celula-ativa");
  });
  palavras.forEach(p => p.li.classList.remove("ativa"));

  if (!ativa) return;

  const atual = celulas[chave(ativa.l, ativa.c)];
  const p = atual.palavras[direcaoAtual];

  if (p) {
    posicoesDaPalavra(p).forEach(([l, c]) => {
      celulas[chave(l, c)].div.classList.add("palavra-ativa");
    });
    p.li.classList.add("ativa");
  }
  atual.div.classList.add("celula-ativa");
}

function conferir() {
  let certas = 0;
  const casasCertas = new Set();

  palavras.forEach(p => {
    const posicoes = posicoesDaPalavra(p);
    const digitado = posicoes
      .map(([l, c]) => celulas[chave(l, c)].input.value)
      .join("");
    const acertou = digitado === p.resposta;

    p.li.classList.remove("certa", "errada");
    p.li.classList.add(acertou ? "certa" : "errada");
    p.li.querySelector(".status").textContent = acertou ? " ✔" : " ✘";

    if (acertou) {
      certas++;
      posicoes.forEach(([l, c]) => casasCertas.add(chave(l, c)));
    }
  });

  Object.entries(celulas).forEach(([k, cel]) => {
    limparCasa(cel);
    if (casasCertas.has(k)) {
      cel.div.classList.add("certa");
    } else if (cel.input.value !== "" && cel.input.value !== cel.solucao) {
      cel.div.classList.add("errada");
    }
  });

  contador.textContent = certas + " de " + palavras.length + " palavras";

  if (certas === palavras.length) {
    mensagem.textContent = "Parabéns! Você completou a cruzadinha!";
    mensagem.className = "ok";
  } else {
    const faltam = palavras.length - certas;
    mensagem.textContent = faltam === 1
      ? "Falta 1 palavra. Confira as marcadas com ✘."
      : "Faltam " + faltam + " palavras. Confira as marcadas com ✘.";
    mensagem.className = "";
  }
}

function reiniciar() {
  Object.values(celulas).forEach(cel => {
    cel.input.value = "";
    limparCasa(cel);
  });

  palavras.forEach(p => {
    p.li.classList.remove("certa", "errada");
    p.li.querySelector(".status").textContent = "";
  });

  contador.textContent = "0 de " + palavras.length + " palavras";
  mensagem.textContent = "";
  mensagem.className = "";
  direcaoAtual = "H";
  ativa = null;
  destacar();
  if (document.activeElement && document.activeElement.blur) {
    document.activeElement.blur();
  }
}

function iniciar() {
  calcularNumeros(palavras);
  montarModelo();
  desenharPistas();
  desenharTabuleiro();

  contador.textContent = "0 de " + palavras.length + " palavras";
  document.getElementById("btn-conferir").addEventListener("click", conferir);
  document.getElementById("btn-reiniciar").addEventListener("click", reiniciar);
}

iniciar();
