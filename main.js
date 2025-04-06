const gameBoard = {
   board: [document.getElementById('zero'), document.getElementById('one'), document.getElementById('two'),
          document.getElementById('three'), document.getElementById('four'), document.getElementById('five'),
          document.getElementById('six'), document.getElementById('seven'), document.getElementById('eight')], 
   
   consoleBoard: ["", "", "",
           "", "", "",
           "", "", ""],

   loadBoard: function (position, mark) {
    this.board[position].innerHTML = mark; 
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
            this.animateWin(winningCombinations[i]);
            player.won++;
            gameController.gameCount++;
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
    gameController.gameCount++;
    return true;
  },



   playRound: function (position) {
  
    if (gameController.isOn) {
      let player = gameController.currentPlayer;
      
    let mark = player.mark;
    if (!this.consoleBoard[position]) {
      this.consoleBoard[position] = mark;
      this.loadBoard(position, mark);
    if (this.checkWin(player)) 
      console.log (`${player.name} won`);
    else if (this.checkDraw())
      console.log("It's a draw");
    gameController.changeTurn();
    }
    else 
      console.log("try again");
    } else
    console.log("Game is Over");
    
    
    
  },

  animateWin: function (combination) {
    for (let i = 0; i <= 2; i++)
      this.board[combination[i]].classList.add('won');
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
    this.currentPlayer = player1;
    this.roundCount = 1;
    gameBoard.consoleBoard = ["", "", "",
                              "", "", "",
                              "", "", ""];
    for (let i = 0; i <= 8; i++) {
      gameBoard.board[i].textContent = '';
      if (gameBoard.board[i].classList.contains('won'))
        gameBoard.board[i].classList.remove('won');
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
