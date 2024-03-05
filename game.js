let boxes = document.querySelectorAll(".game_box");
let resetBtn = document.querySelector("#reset_game_btn");
let msgContainer = document.querySelector(".msg-container");
let resultMsg = document.querySelector("#msg-winner");

let turnX = true;
let drawCount = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnX = true;
  drawCount = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.innerText = "O";
      turnX = false;
    } else {
      box.innerText = "X";
      turnX = true;
    }
    box.disabled = true;
    drawCount++;

    let winner = checkWinner();

    if (drawCount === 9 && !winner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  resultMsg.innerText = `The Match is Draw..`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  resultMsg.innerText = `Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return pos1;
      }
    }
  }
  return null;
};

resetBtn.addEventListener("click", resetGame);
