// Jogo da velha clássico: dois jogadores, X e O.
// Código separado do HTML para facilitar os estudos e a edição.

const cells = Array.from(document.querySelectorAll('.cell'));
const statusElement = document.getElementById('status');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');
const restartButton = document.getElementById('reset-button');
const resetScoreButton = document.getElementById('reset-score');

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
  [0, 4, 8], [2, 4, 6]             // diagonais
];

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let finished = false;
let scores = { X: 0, O: 0, draws: 0 };

function updateStatus(message) {
  statusElement.innerHTML = message;
}

function updateScoreboard() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draws;
}

function getWinningLine() {
  return winningLines.find(([a, b, c]) =>
    board[a] !== '' && board[a] === board[b] && board[b] === board[c]
  );
}

function playTurn(index) {
  if (finished || board[index] !== '') return;

  board[index] = currentPlayer;
  const cell = cells[index];
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.setAttribute('aria-label', `Linha ${Math.floor(index / 3) + 1}, coluna ${(index % 3) + 1}, ${currentPlayer}`);
  cell.disabled = true;

  const line = getWinningLine();
  if (line) {
    finished = true;
    scores[currentPlayer]++;
    updateScoreboard();
    line.forEach((position) => cells[position].classList.add('winner'));
    updateStatus(`Jogador <span class="mark-${currentPlayer.toLowerCase()}">${currentPlayer}</span> venceu! 🎉`);
    cells.forEach((button) => { button.disabled = true; });
    return;
  }

  if (board.every((position) => position !== '')) {
    finished = true;
    scores.draws++;
    updateScoreboard();
    updateStatus('Empate! Ninguém venceu desta vez.');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`É a vez do jogador <span class="mark-${currentPlayer.toLowerCase()}">${currentPlayer}</span>`);
}

function newGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  finished = false;
  cells.forEach((cell, index) => {
    cell.textContent = '';
    cell.disabled = false;
    cell.className = 'cell';
    cell.setAttribute('aria-label', `Linha ${Math.floor(index / 3) + 1}, coluna ${(index % 3) + 1}, vazio`);
  });
  updateStatus('É a vez do jogador <span class="mark-x">X</span>');
}

// Só executar no index.html (as demais páginas não têm tabuleiro).
if (cells.length === 9 && statusElement && restartButton && resetScoreButton) {
  cells.forEach((cell, index) => cell.addEventListener('click', () => playTurn(index)));
  restartButton.addEventListener('click', newGame);
  resetScoreButton.addEventListener('click', () => {
    scores = { X: 0, O: 0, draws: 0 };
    updateScoreboard();
    newGame();
  });
}
