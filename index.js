const blocks = document.querySelectorAll('.game div')
const countRow = Math.sqrt(blocks.length)
let playerIndex = Math.round(blocks.length - Math.sqrt(blocks.length) / 2)

//enemies

const indexEnemies = [
  23
]

const killEnemy = []
let move = 1;

const moveEnemies = () => {
  const leftBlockEnemies = indexEnemies[0] % countRow === 0
  const rightBlockEnemies = indexEnemies[indexEnemies.length - 1] % countRow === countRow - 1
  if ((leftBlockEnemies && move == -1) || (rightBlockEnemies && move == 1)) {
    move = countRow;
  } else if (move === countRow) {
    move = leftBlockEnemies ? 1 : -1;
  }
  // console.log(leftBlockEnemies);
  // console.log(rightBlockEnemies);
  indexEnemies.forEach((index) => {
    blocks[index].classList.remove('enemy')
  });
  for (let i = 0; i < indexEnemies.length; i++) {
    indexEnemies[i] += move
  }
  indexEnemies.forEach((index, i) => {
    if (!killEnemy.includes(i)) {
      blocks[index].classList.add('enemy')
    }
  });
  if (blocks[playerIndex].classList.contains('enemy')) {
    alert('Game Over')
    endGame()
    return
  }
  if (killEnemy.length === indexEnemies.length) {
    alert('WIN')
    endGame()
    return
  }
  setTimeout(moveEnemies, 100)
}
moveEnemies()
// console.log(blocks);

for (const enemy of indexEnemies) {
  blocks[enemy].classList.add('enemy')
}

//player
blocks[playerIndex].classList.add('player')

const movePlayer = (event) => {
  blocks[playerIndex].classList.remove('player')
  if (event.code === 'ArrowLeft' && playerIndex > blocks.length - countRow) {
    // console.log('left');
    playerIndex--
  }
  if (event.code === 'ArrowRight' && playerIndex < blocks.length - 1) {
    // console.log('Right');
    playerIndex++;
  }
  blocks[playerIndex].classList.add('player')
}

document.addEventListener('keydown', movePlayer)


//fire 

const fire = (event) => {

  if (event.code === "Space") {
    let bulletIndex = playerIndex;

    const flyBullet = () => {
      blocks[bulletIndex].classList.remove('bullet');
      bulletIndex -= countRow;
      blocks[bulletIndex].classList.add('bullet');

      if (bulletIndex < countRow) {

        setTimeout(() => {
          blocks[bulletIndex].classList.remove('bullet');
        }, 100)
        return
      }
      if (blocks[bulletIndex].classList.contains('enemy')) {
        blocks[bulletIndex].classList.remove('bullet')
        blocks[bulletIndex].classList.remove('enemy')
        const indexKillEnemy = indexEnemies.indexOf(bulletIndex)
        killEnemy.push(indexKillEnemy)
        return
      }

      setTimeout(flyBullet, 50)
    }
    flyBullet()

    // console.log("ttyyy");
  }
}

document.addEventListener('keydown', fire)

const endGame = () => {
  document.removeEventListener('keydown', fire)
  document.removeEventListener('keydown', movePlayer)
}