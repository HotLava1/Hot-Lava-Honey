(() => {
  const audio = document.getElementById("site-music");
  const button = document.getElementById("music-toggle");
  if (!audio || !button) return;

  const preferenceKey = "hotLavaHoneyMusic";
  const timeKey = "hotLavaHoneyMusicTime";
  audio.volume = 0.18;

  const savedTime = Number(sessionStorage.getItem(timeKey));

  function updateButton() {
    const playing = !audio.paused;
    button.textContent = playing ? "❚❚ Pause Music" : "♫ Play Music";
    button.setAttribute("aria-pressed", playing ? "true" : "false");
  }

  async function startMusic() {
    try {
      if (Number.isFinite(savedTime) && savedTime > 0 && savedTime < 98) audio.currentTime = savedTime;
      await audio.play();
      localStorage.setItem(preferenceKey, "play");
    } catch (_) {
      updateButton();
    }
  }

  button.addEventListener("click", async () => {
    if (audio.paused) {
      await startMusic();
    } else {
      audio.pause();
      localStorage.setItem(preferenceKey, "pause");
    }
    updateButton();
  });

  audio.addEventListener("play", updateButton);
  audio.addEventListener("pause", updateButton);
  window.addEventListener("pagehide", () => {
    sessionStorage.setItem(timeKey, String(audio.currentTime || 0));
  });

  updateButton();
})();