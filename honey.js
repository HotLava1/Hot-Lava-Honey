(() => {
  const film = document.querySelector(".honey-film");
  if (!film) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const playbackSpeed = 1.2;
  let isVisible = true;

  film.defaultPlaybackRate = playbackSpeed;
  film.playbackRate = playbackSpeed;

  const updatePlayback = () => {
    if (document.hidden || !isVisible || reducedMotion.matches) {
      film.pause();
      return;
    }
    film.play().catch(() => {});
  };

  const observer = new IntersectionObserver(entries => {
    isVisible = entries[0]?.isIntersecting ?? false;
    updatePlayback();
  }, { threshold: 0.2 });

  observer.observe(film);
  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener?.("change", updatePlayback);
  film.addEventListener("canplay", updatePlayback, { once: true });

})();
