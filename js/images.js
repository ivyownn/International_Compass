// images.js (now calls backend instead of Unsplash directly)

// Page-specific keywords for Unsplash
const pageKeywords = {
  index: "international students campus",
  about: "community connection support",
  services: "volunteer help guidance",
  resources: "student resources books laptop",
  donate: "charity giving donation",
  contact: "communication support team",
  team: "church community gathering",
};

// Detect current page (index, about, etc.)
function getPageName() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return page.split(".")[0]; // remove .html
}

// Fetch banner image (through backend)
function loadBanner(keyword) {
  fetch(
    `/unsplash-image?query=${encodeURIComponent(keyword)}&orientation=landscape`
  )
    .then((res) => res.json())
    .then((data) => {
      const bannerImg = document.querySelector(".banner img");
      if (bannerImg && data.url) {
        bannerImg.src = data.url;
        bannerImg.alt = keyword + " banner";
      }
    })
    .catch((err) => console.warn("Banner fetch failed", err));
}

// Fetch aside image (through backend)
function loadAside(keyword) {
  fetch(
    `/unsplash-image?query=${encodeURIComponent(keyword)}&orientation=squarish`
  )
    .then((res) => res.json())
    .then((data) => {
      const asideImg = document.querySelector(".sidebar-aside img");
      if (asideImg && data.url) {
        asideImg.src = data.url;
        asideImg.alt = keyword + " aside";
      }
    })
    .catch((err) => console.warn("Aside fetch failed", err));
}

// Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();
  const keyword = pageKeywords[page] || "international students";
  loadBanner(keyword);
  loadAside("compass globe travel");
});
