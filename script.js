let board = ["","","","","","","","",""];
let currentPlayer = "X";
let mode = "cpu";
let gameOver = false;

let playerXName = "Player X";
let playerOName = "Player O";

function setMode(btn, m){
  mode = m;
  document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const playersInput = document.getElementById("playersInput");
  if(mode === "pvp") playersInput.classList.remove("hidden");
  else playersInput.classList.add("hidden");

  resetGame();
}

function saveNames(){
  const p1 = document.getElementById("p1Name").value;
  const p2 = document.getElementById("p2Name").value;

  if(p1) playerXName = p1;
  if(p2) playerOName = p2;

  document.getElementById("nameX").innerText = playerXName;
  document.getElementById("nameO").innerText = playerOName;

  document.getElementById("playersInput").classList.add("hidden");
  setMode(document.querySelectorAll(".mode-btn")[1], "pvp");
}

function play(i){
  if(board[i] || gameOver) return;

  board[i] = currentPlayer;
  document.getElementsByClassName("cell")[i].innerText = currentPlayer;

  if(checkWin()){
    const winner = currentPlayer === "X" ? playerXName : playerOName;
    document.getElementById("status").innerText = winner + " Wins 🎉";
    gameOver = true;
    return;
  }

  if(board.every(c => c)){
    document.getElementById("status").innerText = "Draw 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateActivePlayer();

  if(mode === "cpu" && currentPlayer === "O" && !gameOver){
    setTimeout(cpuMove, 500);
  }
}

function cpuMove(){
  let empty = board.map((v,i)=>v==""?i:null).filter(v=>v!==null);
  play(empty[Math.floor(Math.random()*empty.length)]);
}

function checkWin(){
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for(let combo of winCombos){
    if(combo.every(i => board[i] === currentPlayer)){
      showWinLine(combo);
      return true;
    }
  }
  return false;
}

function showWinLine(combo){
  const line = document.getElementById("winLine");
  const cell = document.querySelector(".cell");
  const cellSize = cell.offsetWidth;
  const gap = 15;

  let x1 = combo[0]%3;
  let y1 = Math.floor(combo[0]/3);
  let x2 = combo[2]%3;
  let y2 = Math.floor(combo[2]/3);

  const startX = x1*(cellSize+gap)+cellSize/2;
  const startY = y1*(cellSize+gap)+cellSize/2;
  const endX = x2*(cellSize+gap)+cellSize/2;
  const endY = y2*(cellSize+gap)+cellSize/2;

  const length = Math.hypot(endX-startX, endY-startY);
  const angle = Math.atan2(endY-startY, endX-startX)*(180/Math.PI);

  line.style.width = length+"px";
  line.style.top = startY+"px";
  line.style.left = startX+"px";
  line.style.transform = `rotate(${angle}deg)`;
  line.style.display = "block";
}

function resetGame(){
  board = ["","","","","","","","",""];
  gameOver = false;
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach(c=>c.innerText="");
  document.getElementById("winLine").style.display="none";
  updateActivePlayer();
}

function updateActivePlayer(){
  document.getElementById("playerX").classList.remove("active");
  document.getElementById("playerO").classList.remove("active");

  if(currentPlayer==="X"){
    document.getElementById("playerX").classList.add("active");
    document.getElementById("status").innerText = playerXName + " Turn";
  }else{
    document.getElementById("playerO").classList.add("active");
    document.getElementById("status").innerText = playerOName + " Turn";
  }
}
function showWinLine(combo){
  const line = document.getElementById("winLine");
  const cell = document.querySelector(".cell");
  const cellSize = cell.offsetWidth;
  const gap = 15;

  let x1 = combo[0]%3;
  let y1 = Math.floor(combo[0]/3);
  let x2 = combo[2]%3;
  let y2 = Math.floor(combo[2]/3);

  const startX = x1*(cellSize+gap)+cellSize/2;
  const startY = y1*(cellSize+gap)+cellSize/2;
  const endX = x2*(cellSize+gap)+cellSize/2;
  const endY = y2*(cellSize+gap)+cellSize/2;

  const length = Math.hypot(endX-startX, endY-startY);
  const angle = Math.atan2(endY-startY, endX-startX)*(180/Math.PI);

  line.style.width = length + "px";
  line.style.top = startY + "px";
  line.style.left = startX + "px";
  line.style.transform = `rotate(${angle}deg) scaleX(0)`; // প্রথমে লাইন ছোট
  line.style.display = "block";

  // 50ms পরে scaleX 1 করে smooth slide animation
  setTimeout(()=>{
    line.style.transform = `rotate(${angle}deg) scaleX(1)`;
  }, 50);
}
