
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
document.addEventListener('keyup', handleKeyUp);

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 250) {
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 15;
          dino.style.bottom = position + 'px';
        }
      }, 25);
    } else {
      // Subindo
      position += 15;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 2000;
  let randomTime = Math.random() * 5000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="fim">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}
function createbird() {
  const bird = document.createElement('div');
  let birdPosition = 4000;
  let randomTime = Math.random() * 5000;

  if (isGameOver) return;

  bird.classList.add('bird');
  background.appendChild(bird);
  bird.style.left = birdPosition + 'px';

  let leftTimer = setInterval(() => {
    if (birdPosition < -50) {
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(bird);
    } else if (birdPosition > 0 && birdPosition == position && position > 0) {
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="fim-jogo">Fim de jogo</h1><div class fim></div>';
    } else {
      birdPosition -= 10;
      bird.style.left = birdPosition + 'px';
    }
  }, 20);

  setTimeout(createbird, randomTime);
}
createCactus();
createbird();