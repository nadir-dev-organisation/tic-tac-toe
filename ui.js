const crossMarkBtn = document.querySelector(".cross-mark");
const noughtMarkBtn = document.querySelector(".nought-mark");
const playerNameBtn = document.querySelectorAll(".player-name");
const botDifficultyBtn = document.querySelectorAll(".bot-difficulty");
const botDifficulties = ["BOT","EASY", "HARD", "IMPOSSIBLE"];

const rightCard = document.querySelector(".right-card");
const rightCardBotBtn = rightCard.querySelector(".bot-difficulty");

const startGameBtn = document.querySelector(".start-game");
const cardContainer = document.querySelector(".card-container");
const gameSetupContainer = document.querySelector(".game-setup-container");
const gameContainer = document.querySelector(".game-container");

const resetScoreBtn = document.querySelector(".reset-score-button");
const backToHomeBtn = document.querySelector(".back-button");


const board = Gameboard;
const game = GameController;

if (rightCardBotBtn.classList.contains("is-selected")) {
  rightCardBotBtn.textContent = botDifficulties[1].toUpperCase();
}

function toggleMark(markButton, secondMarkButton){
  markButton.textContent = markButton.textContent.trim() === "X" ? "O" : "X";
  secondMarkButton.textContent = secondMarkButton.textContent.trim() === "X" ? "O" : "X";
}

function toggleSelected(buttonSelected, secondButton) {
  buttonSelected.classList.toggle("is-selected");

  if (secondButton.classList.contains("is-selected")) {
    secondButton.classList.toggle("is-selected");
  }
}

function toggleAvatar(cardButton) {
  const card = cardButton.closest(".card-player");
  const avatar = card.querySelector(".avatar");
  avatar.classList.add("is-changing");
  const transitionTimeOut = 450;

  if (cardButton.classList.contains("player-name")) {
    setTimeout(() => {
      avatar.addEventListener("load", () => {
        avatar.classList.remove("is-changing");
        avatar.classList.add("is-entering");

        requestAnimationFrame(() => {
          avatar.classList.remove("is-entering");
        });

      }, {once: true});
      avatar.src = "img/player.gif";
    }, transitionTimeOut);
  } if(cardButton.classList.contains("bot-difficulty")) {
    setTimeout(() => {
      avatar.addEventListener("load", () => {
        avatar.classList.remove("is-changing");
        avatar.classList.add("is-entering");

        requestAnimationFrame(() => {
          avatar.classList.remove("is-entering");
        });

      }, {once: true});
      avatar.src = "img/bot.gif";
    }, transitionTimeOut);
  }
}

function toggleBotDifficulty(botButton) {
  if (!botButton.classList.contains("is-selected")) {
    botButton.textContent = botDifficulties[0].toUpperCase();
  } else {
    const currentDifficulty = botButton.textContent.trim().toUpperCase();
    const currentIndex = botDifficulties.indexOf(currentDifficulty);
    const nextIndex = currentIndex === -1 || currentIndex === botDifficulties.length - 1 ? 1 : currentIndex + 1;
    botButton.textContent = botDifficulties[nextIndex].toUpperCase();

  }

}

function handlePlayerNameClick(event) {
  const playerButton = event.currentTarget;
  const wasSelected = playerButton.classList.contains("is-selected");
  const botButton = playerButton.nextElementSibling;
  if (!wasSelected) {
    toggleSelected(playerButton, botButton);
    toggleAvatar(playerButton);
    toggleBotDifficulty(botButton);
    return;
  }
  editPlayerName(playerButton);
}

function editPlayerName(playerButton) {
  const input = document.createElement("input");

  input.className = playerButton.className;
  input.classList.add("player-name-input");
  input.type = "text";
  input.value = playerButton.textContent.trim();

  playerButton.replaceWith(input);
  input.focus();
  input.select();

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "Player".toUpperCase();
      replaceInputWithButton(input);
    } else if (event.key === "Enter") {
      replaceInputWithButton(input);
    }
  });

  input.addEventListener("blur", () => {
    replaceInputWithButton(input);
  });
}

function replaceInputWithButton(input) {
  if (!input.isConnected) return;

  const newPlayerButton = document.createElement("button");

  newPlayerButton.className = input.className.replace("player-name-input", "").trim();
  newPlayerButton.type = "button";
  newPlayerButton.textContent = input.value.trim() || "Player".toUpperCase();

  input.replaceWith(newPlayerButton);
  newPlayerButton.addEventListener("click", handlePlayerNameClick);
}

function showStartGameButton(delay = 500) {
  setTimeout(() => {
    startGameBtn.classList.remove("is-hidden");
    cardContainer.classList.add("has-start-game");
  }, delay);
}

function showGame() {
  const transitionDuration = 450;

  gameSetupContainer.classList.add("is-leaving");

  setTimeout(() => {
    gameSetupContainer.classList.add("is-hidden");
    gameContainer.classList.add("is-rendered");

    requestAnimationFrame(() => {
      gameContainer.classList.add("is-visible");
    });
  }, transitionDuration);
}

function getPlayerFromCard(card) {
  const markBtn = card.querySelector(".player-mark");
  const playerBtn = card.querySelector(".player-name");
  const botBtn = card.querySelector(".bot-difficulty");

  const isBot = botBtn.classList.contains("is-selected");

  const playerName = isBot 
    ? botBtn.textContent.trim().toUpperCase()
    : playerBtn.textContent.trim().toUpperCase();

  const playerMark = markBtn.textContent.trim();

  const playerAvatar = isBot
    ? "img/bot.gif"
    : "img/player.gif"

  return game.createPlayer(playerName, playerMark, playerAvatar);
}

function handleStartGame() {
  const leftCard = document.querySelector(".left-card");
  const rightCard = document.querySelector(".right-card");

  const playerOne = getPlayerFromCard(leftCard);
  const playerTwo = getPlayerFromCard(rightCard);

  if (playerOne.name === playerTwo.name) {
    playerTwo.name = playerTwo.name + " two".toUpperCase();
  }

  const gameLeftCard = document.querySelector(".game-left-card");
  const gameRightCard = document.querySelector(".game-right-card");

  const playerOneName = gameLeftCard.querySelector(".game-player-name");
  const playerOneMark = gameLeftCard.querySelector(".game-player-mark");
  const playerOneAvatar = gameLeftCard.querySelector(".avatar");

  playerOneName.textContent = playerOne.name;
  playerOneMark.textContent = playerOne.mark;
  playerOneAvatar.src = playerOne.avatar;

  const playerTwoName = gameRightCard.querySelector(".game-player-name");
  const playerTwoMark = gameRightCard.querySelector(".game-player-mark");
  const playerTwoAvatar = gameRightCard.querySelector(".avatar");

  playerTwoName.textContent = playerTwo.name;
  playerTwoMark.textContent = playerTwo.mark;
  playerTwoAvatar.src = playerTwo.avatar;

  game.players.push(playerOne);
  game.players.push(playerTwo);
  game.setCurrentPlayer(0);

  displayeBoard();
  showGame();
}

function displayGameInfo() {
  const turnMarker = document.querySelector(".turn-marker");
  const roundNumber = document.querySelector(".round-number");
  turnMarker.textContent = game.getCurrentPlayer().mark;
  roundNumber.textContent = game.getRound();
}

function displayeBoard() {
  const boardContainer = document.querySelector(".board-container");
  boardContainer.textContent = "";
  displayGameInfo();

  board.getBoard().forEach((cell, index) => {
    const boardCell = document.createElement("button");
    boardCell.classList.add("board-cell");
    boardCell.textContent = cell ?? "";
    boardCell.type = "button";

    boardCell.addEventListener("click", () => {

      const roundResult = game.playRound(index);

      if (typeof roundResult === "string") {
        console.log("roundResult : ", roundResult);
      }

      displayeBoard();
    });

    boardContainer.appendChild(boardCell);
  });
}

function setupEventListener(){
  crossMarkBtn.addEventListener("click", (event) => {
    toggleMark(event.currentTarget, noughtMarkBtn);
  });
  noughtMarkBtn.addEventListener("click", (event) => {
    toggleMark(event.currentTarget, crossMarkBtn);
  });
  playerNameBtn.forEach((playerButton) => {
    playerButton.addEventListener("click", handlePlayerNameClick);
  });
  botDifficultyBtn.forEach((botButton) => {
    botButton.addEventListener("click", (event) => {
      const wasSelected = event.currentTarget.classList.contains("is-selected");
      if (!wasSelected) {
        toggleSelected(event.currentTarget, event.currentTarget.previousElementSibling);
        toggleAvatar(event.currentTarget);
      }
      toggleBotDifficulty(event.currentTarget);
    });
  });
  startGameBtn.addEventListener("click", handleStartGame);
  resetScoreBtn.addEventListener("click", () => {
    game.resetGame()
    displayeBoard();
  });
}

setupEventListener();
showStartGameButton();

