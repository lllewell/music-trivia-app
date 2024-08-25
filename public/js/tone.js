const player = new Tone.Player({
  url: "/audio/Jeopardy-theme-song.mp3",
  autostart: false,
}).toDestination();

document.getElementById("sound").addEventListener("click", () => {
  Tone.start()
    .then(() => {
      player.start();
      player.fadeOut = 3;
      player.loop= true;

    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
});

document.getElementById("restart").addEventListener("click", () => {
  Tone.start()
    .then(() => {
      player.start();
      player.fadeOut = 3;
      player.loop= true;
    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
});