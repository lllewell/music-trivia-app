const player = new Tone.Player({
  url: "/audio/Jeopardy-theme-song.mp3",
  autostart: false,
  loop: true,
  fadeOut: 3,
}).toDestination();

const handleStart = () => {
  Tone.start()
    .then(() => {
      player.start();
      player.volume.value = -20;
    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
};

document.getElementById("sound").addEventListener("click", handleStart);
document.getElementById("restart").addEventListener("click", handleStart);
