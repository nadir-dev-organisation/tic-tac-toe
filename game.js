const Gameboard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => board;
  const placeMark = (index, mark) => {
    if (board[index] !== null) return false;
    
    board[index] = mark;
    return true;
  };

  const resetBoard = () => { board = Array(9).fill(null); };

  const checkWinner = () => {
    const firstRow = board.slice(0,3);
    const secondRow = board.slice(3,6);
    const thirdRow = board.slice(6,9);

    const firstDiagonal = [board[0], board[4], board[8]];
    const secondDiagonal = [board[2], board[4], board[6]];

    if (firstRow.every((cell) => cell === 'X') 
        || firstRow.every((cell) => cell === 'O')) {
      return firstRow[0] === 'X' ? 'X' : 'O';
    }
    else if (secondRow.every((cell) => cell === 'X') 
        || secondRow.every((cell) => cell === 'O')) {
      return secondRow[0] === 'X' ? 'X' : 'O';
    }
    else if (thirdRow.every((cell) => cell === 'X') 
        || thirdRow.every((cell) => cell === 'O')) {
      return thirdRow[0] === 'X' ? 'X' : 'O';
    }
    else if (firstDiagonal.every((cell) => cell === 'X') 
        || firstDiagonal.every((cell) => cell === 'O')) {
      return firstDiagonal[0] === 'X' ? 'X' : 'O';
    }
    else if (secondDiagonal.every((cell) => cell === 'X') 
        || secondDiagonal.every((cell) => cell === 'O')) {
      return secondDiagonal[0] === 'X' ? 'X' : 'O';
    }
    else if (board.every((cell) => cell !== null)) {
      return "Full";
    }
    else {
      return false;
    }
  }

  return { getBoard, placeMark, resetBoard, checkWinner};
})();

const GameController = (() => {

  const createPlayer = (name, mark, avatar, score=0) => { return { name, mark, avatar, score } };

  const players = [];

  let currentPlayer = null;
  let round = 1;
  let roundMessage = "";

  const setCurrentPlayer = (index) => currentPlayer = players[index];
  const getOtherPlayer = () => currentPlayer === players[0]
    ? players[1]
    : players[0];
  const getCurrentPlayer = () => currentPlayer;
  const getRound = () => round;
  const incRound = () => round++;
  const incPlayerScore = (player) => player.score++;
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const getPlayerScore = (playerName) => {
    const player = players.find((playerToFind) => playerToFind.name === playerName);
    return player.score;
  }

  const switchRound = (message) => {

    if (round < 3) {
      Gameboard.resetBoard();
      incRound();
      return message;

    } else {
      resetGame();
      return "The game is finished!";
    }
  }

  const playRound = (index) => {
    const markerWasPlaced = Gameboard.placeMark(index, currentPlayer.mark);

    if(!markerWasPlaced) return false;

    const isWinner = Gameboard.checkWinner();

    if (!isWinner) {
      switchPlayerTurn();
    }

    else if (isWinner === "Full") {
      return switchRound("It's a draw!")
    }
    else if (isWinner === "X") {
      if (currentPlayer.mark === isWinner){
        incPlayerScore(currentPlayer);
        roundMessage =`${currentPlayer.name} won!`;  
      } else  {
        incPlayerScore(getOtherPlayer());
        roundMessage =`${getOtherPlayer().name} won!`;
      }
      return switchRound(roundMessage)
    }
    else if (isWinner === "O") {
      if (currentPlayer.mark === isWinner){
        incPlayerScore(currentPlayer);
        roundMessage =`${currentPlayer.name} won!`;  
      } else  {
        incPlayerScore(getOtherPlayer());
        roundMessage =`${getOtherPlayer().name} won!`;
      }
      return switchRound(roundMessage)
    }

    return true;
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = players[0];
    round = 1;
  }

  return { createPlayer, players, setCurrentPlayer, getCurrentPlayer, getRound, playRound, resetGame, switchRound, getPlayerScore };
})();
