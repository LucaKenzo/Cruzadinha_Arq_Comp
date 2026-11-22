# Cruzadinha de Arquitetura Computacional

Jogo de cruzadinha que roda no navegador, feito para treinar os termos da aula de Tópicos de Arquitetura Computacional. Desenvolvido com HTML, CSS e JavaScript puros.

**Site publicado:** https://LucaKenzo.github.io/arqcomp-cruzadinha/

## Como jogar

1. Leia as pistas nas listas **Horizontais** e **Verticais**. O número entre parênteses é a quantidade de letras da resposta.
2. Clique numa casa do tabuleiro (ou numa pista) e digite as letras direto nas casas. O cursor avança sozinho.
3. Clique de novo na casa selecionada, ou use as setas do teclado, para alternar entre horizontal e vertical.
4. Clique em **Conferir** para ver quais palavras estão certas (✔, em verde) e quais estão erradas (✘). O contador mostra quantas palavras você acertou.
5. Clique em **Reiniciar** para limpar o tabuleiro e jogar de novo.

## Palavras e pistas

O tabuleiro tem 16 palavras, todas cruzadas entre si.

### Horizontais

| Nº | Resposta | Pista |
|----|----------|-------|
| 3 | ROM | Memória não volátil gravada na fabricação, cujo conteúdo normalmente não é alterado. |
| 6 | CACHE | Memória veloz entre processador e memória principal que guarda cópias de dados frequentes. |
| 7 | UC | Parte do processador que interpreta instruções e envia sinais de comando aos outros blocos. |
| 10 | MICROCONTROLADOR | Chip único com processador, memória e portas de entrada e saída, usado em Arduino. |
| 11 | FLASH | Memória não volátil regravável por blocos, usada em pen drives e cartões de memória. |
| 13 | DATABUS | Via por onde trafegam os valores lidos e escritos entre processador e memória. |
| 14 | DUALCORE | Processador com dois núcleos de execução no mesmo chip. |
| 16 | RAM | Memória volátil onde ficam programas e dados em uso; perde tudo sem energia. |

### Verticais

| Nº | Resposta | Pista |
|----|----------|-------|
| 1 | QUADCORE | Processador com quatro núcleos de execução no mesmo chip. |
| 2 | REGISTRADORES | Pequenas memórias dentro do processador, as mais rápidas de todas. |
| 4 | MEMORIADEMASSA | Guarda grandes volumes de dados de forma permanente, como HD ou SSD. |
| 5 | EEPROM | Memória não volátil regravável por sinais elétricos, com escrita e apagamento byte a byte. |
| 8 | ADDRESSBUS | Via que carrega a posição da memória que será lida ou escrita. |
| 9 | ULA | Circuito do processador que faz as contas e as comparações lógicas. |
| 12 | DMA | Técnica que permite a periféricos trocar dados com a memória sem ocupar o processador. |
| 15 | CPU | Chip que busca, decodifica e executa as instruções dos programas. |

## Estrutura do projeto

- `index.html`: estrutura da página
- `style.css`: visual do jogo
- `script.js`: tabuleiro, pistas, digitação, botão Conferir, contador e botão Reiniciar
