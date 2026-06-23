const crossMarkBtn = document.querySelector(".cross-mark");
const noughtMarkBtn = document.querySelector(".nought-mark");
const playerNameBtn = document.querySelectorAll(".player-name");
const botDifficultyBtn = document.querySelectorAll(".bot-difficulty");
const botDifficulties = ["BOT","EASY", "HARD", "IMPOSSIBLE"];

const rightCard = document.querySelector(".right-card");
const rightCardBotBtn = rightCard.querySelector(".bot-difficulty");

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
}

setupEventListener();
