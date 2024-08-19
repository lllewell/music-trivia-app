const player = new Tone.Player({
  url: "/audio/Jeopardy-theme-song.mp3",
  autostart: false,
}).toDestination();

document.getElementById("submit").addEventListener("click", () => {
  Tone.start()
    .then(() => {
      player.start();
    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
});
