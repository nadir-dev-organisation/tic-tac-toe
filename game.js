// function createPlayer(name, marker) {
//   return {name, marker};
// }

const Gameboard = (() => {
  let board = Array(9).fill(null);

  const getBoard = () => board;
  const placeMarker = (index, marker) => {
    if (board[index] !== null) return false;
    
    board[index] = marker;
    return true;
  };

  const resetBoard = () => { board = Array(9).fill(null); };

  return { getBoard, placeMarker, resetBoard };
})();

const GameController = (() => {

  const createPlayer = (name, marker) => { return { name, marker } };

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
    const markerWasPlaced = Gameboard.placeMarker(index, currentPlayer.marker);

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
