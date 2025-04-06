const gameBoard = {
   board: [document.getElementById('zero'), document.getElementById('one'), document.getElementById('two'),
          document.getElementById('three'), document.getElementById('four'), document.getElementById('five'),
          document.getElementById('six'), document.getElementById('seven'), document.getElementById('eight')], 
   
   consoleBoard: ["", "", "",
           "", "", "",
           "", "", ""],

   loadBoard: function (position, mark) {
    if (mark === "X")
      this.board[position].innerHTML = `<svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame 1">
      <line class="line" x1="14" y1="36.6274" x2="36.6274" y2="14" stroke="black" stroke-width="8" stroke-linecap="round"/>
      <line class="line" x1="36.6274" y1="36.6274" x2="14" y2="14" stroke="black" stroke-width="8" stroke-linecap="round"/>
      </g>
      </svg>
      `; 
    else  
      this.board[position].innerHTML = `<svg width="80" height="80" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame 1">
      <circle class="circle" cx="24.5" cy="24.5" r="18.5" stroke="white" stroke-width="8"/>
      </g>
      </svg>`;

    console.log(this.consoleBoard);
   },



   analyseBoard: function (player) {
    let currentBoard = [];
    for (let i = 0; i <= 8; i++) 
      if (this.consoleBoard[i] === player.mark)
        currentBoard.push(i);
   return currentBoard;
  },


  checkWin: function (player) {
    currentBoard = this.analyseBoard(player);

    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                 [0, 4, 8], [2, 4, 6]]; 

    for (let i = 0; i < winningCombinations.length; i++){
      let matches = 0;
      for (let j = 0; j <= 2; j++){
        for (let k = 0; k < currentBoard.length; k++) {

          if (winningCombinations[i][j] === currentBoard[k]) {
         
            matches++;

          }

          if (matches === 3) {gameController.isOn = false;
            this.animateWin(winningCombinations[i], player);
            player.won++;
            return true;}
            
        }
      }
    
    }
    return false;
  },
  

  checkDraw: function () {
    for (let i = 0; i <= 8; i++) {
      if (this.consoleBoard[i] === '')
        return false;
    }
    gameController.isOn = false;
    this.animateDraw();
    return true;
  },



   playRound: function (position) {
  
    if (gameController.isOn) {
      let player = gameController.currentPlayer;
      
    let mark = player.mark;
    if (!this.consoleBoard[position]) {
      this.consoleBoard[position] = mark;
      this.loadBoard(position, mark);
    if (this.checkWin(player)){
      console.log (`${player.name} won`);
      return;}
    else if (this.checkDraw()){ 
      console.log("It's a draw");
      return;}
    gameController.changeTurn();
    }
    else 
      console.log("try again");
    } else
    console.log("Game is Over");
    
    
    
  },

  animateWin: function (combination, player) {
    for (let i = 0; i <= 2; i++)
      this.board[combination[i]].classList.add('won');
      document.querySelector('h2').textContent = `${player.name.charAt(0).toUpperCase()+player.name.slice(1)} won`;

  },

  animateDraw: function () {
    for (let i = 0; i <= 8; i++)
      this.board[i].classList.add('draw');
      document.querySelector('h2').textContent = `It's a draw`;
  }
}





function Player (name, mark) {
  this.won = 0;
  this.name = name;
  this.mark = mark;
}

const player1 = new Player("player 1", "X");
const player2 = new Player("player2","0");

const gameController = {
  isOn: true,
  currentPlayer: player1,
  gameCount: 1,
  roundCount: 1,
  changeTurn: function () {
    this.roundCount++;
    if (this.roundCount % 2 === 0) {
      this.currentPlayer = player2;
      document.querySelector('h2').textContent = `Player 2's round`;
    }
    else{ 
      this.currentPlayer = player1;
      document.querySelector('h2').textContent = `Player 1's round`;
    }
  },
  resetGame: function () {
    this.changeTurn();
    this.currentPlayer = player1;
    this.roundCount = 1;
    gameBoard.consoleBoard = ["", "", "",
                              "", "", "",
                              "", "", ""];
    for (let i = 0; i <= 8; i++) {
      gameBoard.board[i].textContent = '';
      if (gameBoard.board[i].classList.contains('won'))
        gameBoard.board[i].classList.remove('won');
      if (gameBoard.board[i].classList.contains('draw'))
        gameBoard.board[i].classList.remove('draw');
    }
    document.querySelector('body>section div:nth-child(1)').textContent = `X won ${player1.won} games`;
    document.querySelector('body>section div:nth-child(2)').textContent = `0 won ${player2.won} games`;
    this.isOn = true; 
    if (this.gameCount % 2 === 0) {
      player1.mark = '0';
      player2.mark = 'X';
    } else {
      player1.mark = 'X';
      player2.mark = '0';
    }
  }
};

for (let i = 0; i < gameBoard.consoleBoard.length; i++) 
  gameBoard.board[i].addEventListener('click', () => gameBoard.playRound(i));

  document.querySelector('button').addEventListener('click', () => {gameController.resetGame()})
