const Gameboard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => board;
  const placeMark = (index, mark) => {
    if (board[index] !== null) return false;
    
    board[index] = mark;
    return true;
  };

  const resetBoard = () => { board = Array(9).fill(null); };

  return { getBoard, placeMark, resetBoard };
})();

const GameController = (() => {

  const createPlayer = (name, mark, avatar) => { return { name, mark, avatar } };

  const players = [];

  let currentPlayer = null;
  let round = 1;

  const setCurrentPlayer = (index) => currentPlayer = players[index];
  const getCurrentPlayer = () => currentPlayer;
  const getRound = () => round;
  const switchPlayerTurn = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
  const playRound = (index) => {
    const markerWasPlaced = Gameboard.placeMark(index, currentPlayer.mark);

    if(!markerWasPlaced) return false;

    switchPlayerTurn();
    return true;
  };
  const resetGame = () => {
    Gameboard.resetBoard();
    currentPlayer = players[0];
    round = 1;
  }

  return { createPlayer, players, setCurrentPlayer, getCurrentPlayer, getRound, playRound, resetGame };
})();
