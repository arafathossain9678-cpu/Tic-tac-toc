let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

let mode = localStorage.mode || "cpu";         
let level = localStorage.level || "simple";
let p1 = localStorage.p1 || "You";
let p2 = mode === "cpu" ? "Computer" : (localStorage.p2 || "Player O");

const statusEl = document.getElementById("status");
const playersEl = document.getElementById("players");

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let winningCells = [];

/* ================= PLAY ================= */
function play(index){
  if(board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  document.getElementsByClassName("cell")[index].textContent = currentPlayer;

  if(checkWinner(board)){
    gameActive = false;
    highlightWinningCells();
    statusEl.textContent = `${currentPlayer==="X"?p1:p2} Wins 🎉`;
    saveStat(currentPlayer);
    return;
  }

  if(!board.includes("")){
    gameActive = false;
    statusEl.textContent = "Draw 🤝";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updatePlayersDisplay();
  statusEl.textContent = `${currentPlayer==="X"?p1:p2} Turn`;

  if(mode === "cpu" && currentPlayer === "O"){
    setTimeout(aiMove, 300);
  }
}

/* ================= WIN CHECK ================= */
function checkWinner(bd){
  winningCells = [];
  for(let [a,b,c] of winningCombinations){
    if(bd[a] && bd[a] === bd[b] && bd[a] === bd[c]){
      winningCells = [a,b,c];
      return true;
    }
  }
  return false;
}

function highlightWinningCells(){
  const cells = document.getElementsByClassName("cell");
  for(let i of winningCells){
    cells[i].classList.add("win");
  }
}

/* ================= AI ================= */
function aiMove(){
  let move;
  if(level === "simple"){
    move = randomMove();
  }
  else if(level === "normal"){
    move = normalMove();
  }
  else if(level === "hard"){
    move = minimax(board, "O").index;
  }
  play(move);
}

/* ===== SIMPLE ===== */
function randomMove(){
  const empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  return empty[Math.floor(Math.random()*empty.length)];
}

/* ===== NORMAL ===== */
function normalMove(){
  const empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);

  // Win
  for(let i of empty){
    board[i]="O";
    if(checkWinner(board)){ board[i]=""; return i; }
    board[i]="";
  }

  // Block
  for(let i of empty){
    board[i]="X";
    if(checkWinner(board)){ board[i]=""; return i; }
    board[i]="";
  }

  return randomMove();
}

/* ===== HARD (MINIMAX) ===== */
function minimax(newBoard, player){
  const empty = newBoard.map((v,i)=>v===""?i:null).filter(v=>v!==null);

  if(checkStaticWinner(newBoard,"X")) return {score:-10};
  if(checkStaticWinner(newBoard,"O")) return {score:10};
  if(empty.length === 0) return {score:0};

  let moves = [];

  for(let i of empty){
    let move = {index:i};
    newBoard[i] = player;
    let result = minimax(newBoard, player==="O"?"X":"O");
    move.score = result.score;
    newBoard[i] = "";
    moves.push(move);
  }

  let bestMove;
  if(player === "O"){
    let bestScore = -Infinity;
    for(let m of moves){
      if(m.score > bestScore){
        bestScore = m.score;
        bestMove = m;
      }
    }
  } else {
    let bestScore = Infinity;
    for(let m of moves){
      if(m.score < bestScore){
        bestScore = m.score;
        bestMove = m;
      }
    }
  }
  return bestMove;
}

function checkStaticWinner(bd, player){
  return winningCombinations.some(
    ([a,b,c]) => bd[a]===player && bd[b]===player && bd[c]===player
  );
}

/* ================= RESET ================= */
function reset(){
  board = ["","","","","","","","",""];
  gameActive = true;
  currentPlayer = "X";
  winningCells = [];
  statusEl.textContent = `${p1} Turn`;

  const cells = document.getElementsByClassName("cell");
  for(let cell of cells){
    cell.textContent="";
    cell.classList.remove("win");
  }
  updatePlayersDisplay();
}

function goBack(){
  window.history.back();
}

/* ================= UI ================= */
function updatePlayersDisplay(){
  const nameO = mode==="cpu"?"Computer":p2;
  playersEl.innerHTML = `
    <div class="${currentPlayer==='X'?'active':''}">${p1} (X)</div>
    <div class="${currentPlayer==='O'?'active':''}">${nameO} (O)</div>
  `;
}

updatePlayersDisplay();
statusEl.textContent = `${p1} Turn`;
