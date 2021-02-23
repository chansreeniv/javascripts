const ATTACK_VALUE = 10; //global value declaration mehod
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER STRONG ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER HEAL';
const LOG_EVENT_GAME_OVER = 'GAME OVER';

const enterValue = prompt('set max life for player and monster. ', '100');

let chosenMaxLife = +enterValue;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
  console.log('maxlifeset at 100');
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {     event: event,
    value: value, 
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth

  }
  if(event === LOG_EVENT_PLAYER_ATTACK){
    logEntry.target = 'MONSTER';
  }else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK){
    logEntry = {
      event: event,
      value: value, 
      target: 'MONSTER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    }
  } else if (event === LOG_EVENT_MONSTER_ATTACK){
    logEntry = {
      event: event,
      value: value, 
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    }
  }else if (event === LOG_EVENT_PLAYER_HEAL){
    logEntry = {
      event: event,
      value: value, 
      target: 'PLAYER',
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    }
  } else if (event === LOG_EVENT_GAME_OVER){
    logEntry = {
      event: event,
      value: value, 
      finalMonsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    }
  } 
  battleLog.push(logEntry);
}

function reset(){
currentMonsterHealth = chosenMaxLife;
currentPlayerHealth = chosenMaxLife;
resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;

  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    alert("bonus life is used!");
    setPlayerHealth(initialPlayerHealth);
  }

  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("Player 1 Wins");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'Player 1 wins!!', currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("game Over");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'Game Over', currentMonsterHealth, currentPlayerHealth);
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Its a draw");
    writeToLog(LOG_EVENT_MONSTER_ATTACK, 'Its a draw', currentMonsterHealth, currentPlayerHealth);
  }

  if( currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
      reset();
  }
}

function attackMonster(mode) {
  const maxDamage = mode === MODE_ATTACK? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  //using ternary Expression
  let logEvent;
  if (mode === MODE_ATTACK) {
    // maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK;
  } else {
    // maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  }
  const damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("heal complete!");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
  endRound();
}

function printHandler(){ console.log(battleLog)}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printHandler)
