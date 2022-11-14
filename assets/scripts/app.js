const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 15;
const STRONG_ATTACK_VALUE = 17;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function attackMonster(mode) {
  let maxDamage;
  if (mode === "ATACK") {
    maxDamage = ATTACK_VALUE;
  } else if (mode === "STRONG_ATACK") {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  let damage = dealMonsterDamage(maxDamage);
  currentMonsterHealth -= damage;
  let playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
    alert("YOU WON");
  } else if (currentMonsterHealth >= 0 && currentPlayerHealth <= 0) {
    alert("YOU LOST");
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("DRAW");
  }
}
function attackHandler() {
  attackMonster("ATACK");
}

function strongAttackHandler() {
  attackMonster("STRONG_ATACK");
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
