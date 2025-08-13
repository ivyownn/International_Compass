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

// Determine current page name
function getPageName() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return page.split(".")[0];
}

// Local vs production base
const API_BASE =
  window.location.hostname === "localhost" ? "http://localhost:5001" : "";

// Fetch & apply banner image from backend Unsplash proxy
async function loadBanner(keyword) {
  try {
    const res = await fetch(
      `${API_BASE}/unsplash-image?query=${encodeURIComponent(
        keyword
      )}&orientation=landscape`
    );
    const data = await res.json();
    const bannerImg = document.querySelector(".banner img");
    if (bannerImg && data && data.url) {
      bannerImg.src = data.url;
      bannerImg.alt = data.altDescription || `${keyword} banner image`;
      bannerImg.loading = "eager";
      bannerImg.decoding = "async";
    }
  } catch (err) {
    console.warn("Banner fetch failed", err);
  }
}

// Init after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();
  const keyword = pageKeywords[page] || "international students";
  loadBanner(keyword);
});
