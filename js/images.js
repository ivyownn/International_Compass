// images.js
const accessKey = "YOUR_UNSPLASH_KEY";

const pageKeywords = {
  index: "international students campus",
  about: "community connection support",
  services: "volunteer help guidance",
  resources: "student resources books laptop",
  donate: "charity giving donation",
  contact: "communication support team",
  team: "church community gathering",
};

function getPageName() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return page.split(".")[0];
}

function loadBanner(keyword) {
  fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      keyword
    )}&orientation=landscape&client_id=${accessKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      const bannerDiv = document.querySelector(".banner img");
      if (bannerDiv && data?.urls?.regular) {
        bannerDiv.src = data.urls.regular;
        bannerDiv.alt = keyword + " banner";
      }
    })
    .catch((err) => console.warn("Unsplash banner fetch failed", err));
}

function loadAside(keyword) {
  fetch(
    `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
      keyword
    )}&orientation=squarish&client_id=${accessKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      const asideImg = document.querySelector(".sidebar-aside img");
      if (asideImg && data?.urls?.small) {
        asideImg.src = data.urls.small;
        asideImg.alt = keyword + " aside";
      }
    })
    .catch((err) => console.warn("Unsplash aside fetch failed", err));
}

document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();
  const keyword = pageKeywords[page] || "international students";
  loadBanner(keyword);
  loadAside("compass globe travel");
});
