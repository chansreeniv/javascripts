const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";
const DEFAULT_USER_CHOICE = ROCK;

let gameIsRunning = false;

const getPlayerChoice = function () {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else return SCISSORS;
};

const decideWinner = (player, computer) => {
  if (computer === player) {
    return RESULT_DRAW;
  } else if (
    (computer === ROCK && player === PAPER) ||
    (computer === PAPER && player === SCISSORS) ||
    (computer === SCISSORS && player === ROCK)
  ) {
    return RESULT_PLAYER_WINS;
  } else  {
    return RESULT_COMPUTER_WINS;
  }
};

startGameBtn.addEventListener("click", function () {
  if (gameIsRunning) return;
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerSelection = getPlayerChoice();
  const computerSelection = getComputerChoice();
  console.log(`playerSelection: ${playerSelection} &  computerSelection: ${computerSelection}`);
  const result = decideWinner(playerSelection, computerSelection);
  console.log(result);

  let message = `playerSelection: ${playerSelection} &  computerSelection: ${computerSelection}, Hence `;
  if(result === RESULT_DRAW){
    message = message + `its a Draw`;
  } else if( result === RESULT_PLAYER_WINS) {
    message = message + `You Win!!`
  } else if(  result === RESULT_COMPUTER_WINS){
    message = message + `Computer wins`
  }
  alert(message);
  gameIsRunning = false;
});
