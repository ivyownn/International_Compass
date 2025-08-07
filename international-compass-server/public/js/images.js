// images.js (fetch banner only - no aside images)

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

// Handle local vs production API
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://your-production-domain.com"; // update with real production URL

fetch(
  `${API_BASE}/unsplash-image?query=${encodeURIComponent(
    keyword
  )}&orientation=landscape`
);

// Fetch banner image (through backend)
function loadBanner(keyword) {
  fetch(
    `${API_BASE}/unsplash-image?query=${encodeURIComponent(
      keyword
    )}&orientation=landscape`
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

// Run after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();
  const keyword = pageKeywords[page] || "international students";
  loadBanner(keyword);
});
