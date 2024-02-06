function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

function setupColorChanger() {
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');
  let colorChangeInterval = null;

  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    colorChangeInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });

  stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(colorChangeInterval);
  });

  stopButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', setupColorChanger);
