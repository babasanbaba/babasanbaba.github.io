document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  initSongOfTheDay();
});

function initSongOfTheDay() {
  const container = document.getElementById("song-of-the-day");
  if (!container || typeof SONGS_OF_THE_DAY === "undefined" || SONGS_OF_THE_DAY.length === 0) {
    return;
  }

  const dayCount = Math.floor(Date.now() / 86400000);
  const song = SONGS_OF_THE_DAY[dayCount % SONGS_OF_THE_DAY.length];

  const caption = document.createElement("p");
  caption.className = "song-caption";
  caption.textContent = song.title;
  container.appendChild(caption);

  const iframe = document.createElement("iframe");
  iframe.src = `https://embed.music.apple.com/jp/song/${song.slug}/${song.id}`;
  iframe.allow = "autoplay *; encrypted-media *;";
  iframe.loading = "lazy";
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("height", "150");
  iframe.setAttribute(
    "sandbox",
    "allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
  );
  container.appendChild(iframe);
}
