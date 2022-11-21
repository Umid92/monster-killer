const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const LOG_EVENT_PLAYER_ATTACK = "Player Attack";
const LOG_EVENT_MONSTER_ATTACK = "Monster Attack";
const LOG_EVENT_STRONG_ATTACK = "Strong Attack";
const LOG_EVENT_HEAL_PLAYER = "Heal Player";
const LOG_EVENT_GAME_OVER = "Game Over";

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];

function writeLog(ev, val, playerHealth, monsterHealth) {
  let logEntry;
  logEntry = {
    event: ev,
    value: val,
    playerHealth: playerHealth,
    monsterHealth: monsterHealth,
  };
  battleLog.push(logEntry);
}
let enteredValue = prompt("Please enter the value", "100");
chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife < 0) {
  chosenMaxLife = 100;
}
adjustHealthBars(chosenMaxLife);
function reset() {
  currentMonsterHealth = chosenMaxLife;
  currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}
function endRound() {
  let initialPlayerHealth = currentPlayerHealth;

  let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentPlayerHealth,
    currentMonsterHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You lost but bonus life has saved you");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
    alert("YOU WON");
    writeLog(
      LOG_EVENT_GAME_OVER,
      "YOU WON",
      currentPlayerHealth,
      currentMonsterHealth
    );
  } else if (currentMonsterHealth >= 0 && currentPlayerHealth <= 0) {
    alert("YOU LOST");
    writeLog(
      LOG_EVENT_GAME_OVER,
      "YOU LOST",
      currentPlayerHealth,
      currentMonsterHealth
    );
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("DRAW");
    writeLog(
      LOG_EVENT_GAME_OVER,
      "A DRAW",
      currentPlayerHealth,
      currentMonsterHealth
    );
  }
  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  let damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  endRound();
  writeLog(mode, damage, currentPlayerHealth, currentMonsterHealth);
}
function attackHandler() {
  attackMonster("ATACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATACK");
}

function healHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You cant heal more than initial health");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeLog(
    LOG_EVENT_HEAL_PLAYER,
    healValue,
    currentPlayerHealth,
    currentMonsterHealth
  );
  endRound();
}
function printLogHandler() {
  console.log(battleLog);
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", printLogHandler);
