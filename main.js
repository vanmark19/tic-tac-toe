const gameBoard = {
   board: ["", "", "",
           "", "", "",
           "", "", ""],

   loadBoard: function () {
    console.log(this.board);
   },



   analyseBoard: function (player) {
    let currentBoard = [];
    for (let i = 0; i <= 8; i++) 
      if (this.board[i] === player.mark)
        currentBoard.push(i);
   return currentBoard;
  },


  checkWin: function (player) {
    currentBoard = this.analyseBoard(player);
    const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                                 [0, 3, 6], [1, 4, 7], [2, 5, 8],
                                 [0, 4, 8], [2, 4, 6]]; 
    for (let i = 0; i < winningCombinations.length; i++) 
      for (let j = 0; j <= 2; j++){
        if (winningCombinations[i][j] === currentBoard[j] && j === 2) 
          return true;
        else if (winningCombinations[i][j] !== currentBoard[j])
          break;
      }
      return false;
    },
  

  checkDraw: function () {
    for (let i = 0; i <= 8; i++) {
      if (this.board[i] === '')
        return false;
    }
    return true;
  },



   playRound: function (player, position) {
    let mark = player.mark;
    if (!this.board[position]) {
      this.board[position] = mark;
      this.loadBoard();
    if (this.checkWin(player)) 
      console.log (`${player.name} won`);
    else if (this.checkDraw())
      console.log("It's a draw");
    }
    else 
      console.log("try again");
    
    
  },

  
}





function Player (name, mark) {
  this.name = name;
  this.mark = mark;
}

const player1 = new Player("player 1", "X");
const player2 = new Player("player2","0");
