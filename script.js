const params = new URLSearchParams(window.location.search);
const guest = params.get("guest");

const guestNameTitle = document.getElementById("guestName");
const invitedGuestName = document.getElementById("invitedGuestName");

if (guest) {
  if (guestNameTitle) {
    guestNameTitle.innerText = guest;
  }

  if (invitedGuestName) {
    invitedGuestName.innerText = guest;
  }
}

/* Auto fit guest name inside invitation bar */
function fitInvitedName() {
  const nameBox = document.getElementById("invitedGuestName");

  if (!nameBox) return;

  const wrapper = nameBox.parentElement;

  if (!wrapper) return;

  const wrapperWidth = wrapper.offsetWidth;

  let fontSize;

  if (wrapperWidth <= 390) {
    fontSize = 12;
  } else if (wrapperWidth <= 600) {
    fontSize = 16;
  } else {
    fontSize = 28;
  }

  nameBox.style.fontSize = fontSize + "px";

  while (nameBox.scrollWidth > nameBox.clientWidth && fontSize > 6) {
    fontSize -= 0.5;
    nameBox.style.fontSize = fontSize + "px";
  }
}

window.addEventListener("load", fitInvitedName);
window.addEventListener("resize", fitInvitedName);

/* Countdown */
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

/* Music */
const music = document.getElementById("weddingMusic");
const musicNotice = document.getElementById("musicNotice");

let musicStarted = false;

function startMusicOnTouch() {
  if (!music || musicStarted) return;

  music.volume = 0.45;

  music.play()
    .then(() => {
      musicStarted = true;

      if (musicNotice) {
        musicNotice.classList.add("hide");
      }

      document.removeEventListener("click", startMusicOnTouch);
      document.removeEventListener("touchstart", startMusicOnTouch);
      document.removeEventListener("scroll", startMusicOnTouch);
    })
    .catch(() => {
      if (musicNotice) {
        musicNotice.classList.remove("hide");
      }
    });
}

window.addEventListener("load", () => {
  if (!music) return;

  music.volume = 0.45;

  music.play()
    .then(() => {
      musicStarted = true;

      if (musicNotice) {
        musicNotice.classList.add("hide");
      }
    })
    .catch(() => {
      if (musicNotice) {
        musicNotice.classList.remove("hide");
      }
    });
});

document.addEventListener("click", startMusicOnTouch);
document.addEventListener("touchstart", startMusicOnTouch);
document.addEventListener("scroll", startMusicOnTouch);