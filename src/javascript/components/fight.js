import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {

  return new Promise((resolve) => {
    const leftPlayerGame = {
      ...firstFighter,
      currHealthLevel: firstFighter.health,
      isBlocked: false,
      crucialHitLastTime: 0,
      lifebar: document.getElementById('left-fighter-indicator'),
      lastKeyTime: Date.now()
    };
    const rightPlayerGame = {
      ...secondFighter,
      currHealthLevel: secondFighter.health,
      isBlocked: false,
      crucialHitLastTime: 0,
      lifebar: document.getElementById('right-fighter-indicator'),
      lastKeyTime: Date.now()
    };

    let seqBuffer = [];
    document.addEventListener('keydown', (event) => {
      const keyPressed = event.code;
      switch (keyPressed) {
        case controls.PlayerOneAttack:
          if (!leftPlayerGame.isBlocked && !rightPlayerGame.isBlocked) {
            let damage = getDamage(leftPlayerGame, rightPlayerGame);
            rightPlayerGame.currHealthLevel -= damage;
            const rightLifebarProgress = (rightPlayerGame.currHealthLevel * 100) / rightPlayerGame.health + '%';
            rightPlayerGame.lifebar.style.width = rightLifebarProgress;
          }
          break;
        case controls.PlayerOneBlock:
          leftPlayerGame.isBlocked = true;
          break;
        case controls.PlayerTwoAttack:
          if (!leftPlayerGame.isBlocked && !rightPlayerGame.isBlocked) {
            let damage = getDamage(rightPlayerGame, leftPlayerGame);
            leftPlayerGame.currHealthLevel -= damage;
            const leftLifebarProgress = (leftPlayerGame.currHealthLevel * 100) / leftPlayerGame.health + '%';
            leftPlayerGame.lifebar.style.width = leftLifebarProgress;
          }
          break;
        case controls.PlayerTwoBlock:
          rightPlayerGame.isBlocked = true;
          break;
        default:
          break;
      }

      console.log(event);
      //check combinations

      console.log(event);
      const currentTime = Date.now();
      seqBuffer.push(event.key);
      console.log(seqBuffer.length);
      let resSequence = seqBuffer.join('');
      leftPlayerGame.lastKeyTime = currentTime;
      rightPlayerGame.lastKeyTime = currentTime;

      console.log(resSequence);
      if (resSequence.includes('qwe')) {
        console.log('includes qwe');
        cruicialHit(leftPlayerGame, rightPlayerGame);
      }
      if (resSequence.includes('uio')) {
        console.log('includes uio');
        cruicialHit(rightPlayerGame, leftPlayerGame);
      }
      // handle win
      if (leftPlayerGame.currHealthLevel <= 0) {
        console.log('right won');
        resolve(secondFighter);
      } else if (rightPlayerGame.currHealthLevel <= 0) {
        console.log('left won');
        resolve(firstFighter);
      }
    });

    document.addEventListener('keyup', (event) => {
      const keyPressed = event.code;
      leftPlayerGame.seqBuffer = [];
      rightPlayerGame.seqBuffer = [];
      if (keyPressed === controls.PlayerOneBlock) {
        leftPlayerGame.isBlocked = false;
      }
      if (keyPressed === controls.PlayerTwoBlock) {
        rightPlayerGame.isBlocked = false;
      }
    });
  });
}

export function getDamage(attacker, defender) {
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return hitPower > blockPower ? hitPower - blockPower : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  return fighter.defense * dodgeChance;
}

export function cruicialHit(attacker, defender) {
  let damage = getHitPower(attacker);
  defender.currentHealth -= 2 * damage;
  defender.lifebar.style.width = (defender.currHealthLevel * 100) / defender.health + '%';
}
