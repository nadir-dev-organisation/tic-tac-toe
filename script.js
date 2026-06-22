const crossMarkBtn = document.querySelector(".cross-mark");
const noughtMarkBtn = document.querySelector(".nought-mark");

function toggleMark(markButton, secondMarkButton){
  markButton.textContent = markButton.textContent.trim() === "X" ? "O" : "X";
  secondMarkButton.textContent = secondMarkButton.textContent.trim() === "X" ? "O" : "X";
}

function setupEventListener(){
  crossMarkBtn.addEventListener("click", (event) => {
    toggleMark(event.currentTarget, noughtMarkBtn);
  });
  noughtMarkBtn.addEventListener("click", (event) => {
    toggleMark(event.currentTarget, crossMarkBtn);
  });

}

setupEventListener();
