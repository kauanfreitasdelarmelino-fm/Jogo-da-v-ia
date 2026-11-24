# All Games — Jogo da Velha Clássico

Projeto escolar com layout inspirado na organização visual do repositório
https://github.com/VitorHugoLimadeOlivera/tictactoe

## Como abrir
1. Extraia o arquivo ZIP.
2. Abra a pasta `jogo-da-velha-bootstrap` no VS Code.
3. Abra `index.html` no navegador (ou use Live Server).

## Funcionalidades
- Dois jogadores no mesmo computador: X e O.
- Detecção de vitória, empate, botão Reiniciar e placar.
- Navbar responsiva e carrossel feitos com Bootstrap 5.
- Páginas Home, História e Dicas.

## Arquivos
- `index.html`: página principal, tabuleiro, carrossel e botão **Saiba mais** (abre a História).
- `css/mystyle.css`: cores, tabuleiro e alterações visuais.
- `js/myscript.js`: lógica do jogo.
- `pages/historia.html`: história resumida do jogo.
- `pages/dicas.html`: dicas para jogar.
- `vendor/`: arquivos locais do Bootstrap 5.3.6 (incluídos para uso offline).

## Observações
O jogo roda sem internet. Para a fonte decorativa Nosifer carregar,
é necessária internet; sem ela, uma fonte substituta é usada.
As imagens do carrossel são representações criadas com HTML e CSS,
sem dependência de personagens ou imagens externas.

Na página inicial, o botão **Saiba mais** leva diretamente para **História**.
