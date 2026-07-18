document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  initSongOfTheDay();
  renderBlogScroll();
  renderBlogList();
});

function sortedPosts() {
  if (typeof BLOG_POSTS === "undefined") return [];
  return [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDateDots(dateStr) {
  return dateStr.replaceAll("-", ".");
}

function renderBlogScroll() {
  const container = document.getElementById("blog-scroll");
  if (!container) return;

  const posts = sortedPosts().slice(0, 5);
  posts.forEach((post) => {
    const item = document.createElement("a");
    item.className = "blog-scroll-item";
    item.href = post.url;
    item.target = "_blank";
    item.rel = "noopener";

    item.innerHTML = `
      <div class="blog-scroll-thumb"><img src="${post.thumb}" alt=""></div>
      <p class="blog-scroll-date">${formatDateDots(post.date)}</p>
      <p class="blog-scroll-title">${post.title}</p>
    `;
    container.appendChild(item);
  });
}

function renderBlogList() {
  const container = document.getElementById("post-list");
  if (!container) return;

  const posts = sortedPosts();
  posts.forEach((post) => {
    const item = document.createElement("a");
    item.className = "post-item";
    item.href = post.url;
    item.target = "_blank";
    item.rel = "noopener";

    item.innerHTML = `
      <div class="post-thumb"><img src="${post.thumb}" alt=""></div>
      <div class="post-content">
        <p class="post-date">${formatDateDots(post.date)}</p>
        <h3>${post.title}</h3>
        <span class="post-source">noteで読む</span>
      </div>
    `;
    container.appendChild(item);
  });
}

let currentSongIndex = null;

function renderSong(container, index) {
  currentSongIndex = index;
  const song = SONGS_OF_THE_DAY[index];
  container.innerHTML = "";

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

function initSongOfTheDay() {
  const container = document.getElementById("song-of-the-day");
  if (!container || typeof SONGS_OF_THE_DAY === "undefined" || SONGS_OF_THE_DAY.length === 0) {
    return;
  }

  const dayCount = Math.floor(Date.now() / 86400000);
  renderSong(container, dayCount % SONGS_OF_THE_DAY.length);

  const rerollButton = document.getElementById("song-reroll");
  if (rerollButton) {
    rerollButton.addEventListener("click", () => {
      if (SONGS_OF_THE_DAY.length <= 1) return;
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * SONGS_OF_THE_DAY.length);
      } while (nextIndex === currentSongIndex);
      renderSong(container, nextIndex);
    });
  }
}
