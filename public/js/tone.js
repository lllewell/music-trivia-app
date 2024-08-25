const player = new Tone.Player({
  url: "/audio/Jeopardy-theme-song.mp3",
  autostart: false,
  loop: true,
  fadeOut: 3
}).toDestination();


document.getElementById("sound").addEventListener("click", () => {
  Tone.start()
    .then(() => {
      // const vol = new Tone.Volume(-1000).toDestination();
      player.start();
      player.volume.value = -20;
    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
});

document.getElementById("restart").addEventListener("click", () => {
  Tone.start()
    .then(() => {
      player.start();
      player.volume.value = -20;
      // const vol = new Tone.Volume(-12).toDestination();
    })
    .catch((error) => {
      console.error("Error starting Tone.js:", error);
    });
});