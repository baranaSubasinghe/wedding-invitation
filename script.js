const params = new URLSearchParams(window.location.search);
const guest = params.get("guest");

if (guest) {
  document.getElementById("guestName").innerText = guest;
}

const weddingDate = new Date("August 27, 2026 19:00:00").getTime();

const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    clearInterval(timer);

    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";

    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
  document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
}, 1000);

const music = document.getElementById("weddingMusic");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  if (!music || !musicBtn) return;

  music.volume = 0.45;

  music.play()
    .then(() => {
      musicBtn.innerText = "❚❚ Pause Music";
    })
    .catch(() => {
      musicBtn.innerText = "♫ Play Music";
    });
});

function toggleMusic() {
  if (!music || !musicBtn) return;

  if (music.paused) {
    music.play();
    musicBtn.innerText = "❚❚ Pause Music";
  } else {
    music.pause();
    musicBtn.innerText = "♫ Play Music";
  }
}