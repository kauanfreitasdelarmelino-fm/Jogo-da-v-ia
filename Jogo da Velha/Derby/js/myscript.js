const teams = { X: 'Palmeiras', O: 'Corinthians' };
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
  statusElement.textContent = message;
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
  const crest = document.createElement('img');
  crest.src = 'img/' + teams[currentPlayer].toLowerCase() + '.png';
  crest.alt = '';
  cell.replaceChildren(crest);
  cell.classList.add(currentPlayer.toLowerCase());
  cell.setAttribute('aria-label', `Linha ${Math.floor(index / 3) + 1}, coluna ${(index % 3) + 1}, ${teams[currentPlayer]}`);
  cell.disabled = true;

  const line = getWinningLine();
  if (line) {
    finished = true;
    scores[currentPlayer]++;
    updateScoreboard();
    line.forEach((position) => cells[position].classList.add('winner'));
    updateStatus(`${teams[currentPlayer]} venceu!`);
    cells.forEach((button) => { button.disabled = true; });
    return;
  }

  if (board.every((position) => position !== '')) {
    finished = true;
    scores.draws++;
    updateScoreboard();
    updateStatus('Empate!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus(`Vez do ${teams[currentPlayer]}`);
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
  updateStatus('Vez do Palmeiras');
}

// Só executar no index.html (as demais páginas não têm tabuleiro).
if (cells.length === 9 && statusElement && restartButton && resetScoreButton) {
  newGame();
  cells.forEach((cell, index) => cell.addEventListener('click', () => playTurn(index)));
  restartButton.addEventListener('click', newGame);
  resetScoreButton.addEventListener('click', () => {
    scores = { X: 0, O: 0, draws: 0 };
    updateScoreboard();
    newGame();
  });
}
