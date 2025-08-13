// Keywords for each page -> banner topic
const pageKeywords = {
  index: "happy international students campus learning smiling",
  about: "community connection support friendship teamwork",
  services: "help guidance volunteering positive impact",
  resources: "students books laptops learning classroom",
  donate: "happy students families giving support smiling",
  contact: "communication support team friendly",
  team: "church community gathering happy diverse",
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
    : "https://international-compass.onrender.com"; // your Render backend

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
        bannerImg.alt = `${keyword} banner`;
        console.log("Banner loaded for:", keyword);
      } else {
        console.warn("No banner found for:", keyword);
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
