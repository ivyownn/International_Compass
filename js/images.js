// images.js (fetches images via backend proxy)

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

// Get current page name
function getPageName() {
  const path = window.location.pathname;
  const page = path.substring(path.lastIndexOf("/") + 1) || "index.html";
  return page.split(".")[0]; // strip .html
}

// Load banner image via backend
async function loadBanner(keyword) {
  try {
    const res = await fetch(
      `/unsplash-image?query=${encodeURIComponent(
        keyword
      )}&orientation=landscape`
    );
    const data = await res.json();
    const bannerImg = document.querySelector(".banner img");
    if (bannerImg && data.url) {
      bannerImg.src = data.url;
      bannerImg.alt = `${keyword} banner`;
    }
  } catch (err) {
    console.warn("Banner fetch failed", err);
  }
}

// If you have an aside image, uncomment and ensure aside markup has an <img>
// async function loadAside(keyword) {
//   try {
//     const res = await fetch(
//       `/unsplash-image?query=${encodeURIComponent(keyword)}&orientation=squarish`
//     );
//     const data = await res.json();
//     const asideImg = document.querySelector(".sidebar-aside img");
//     if (asideImg && data.url) {
//       asideImg.src = data.url;
//       asideImg.alt = `${keyword} aside`;
//     }
//   } catch (err) {
//     console.warn("Aside fetch failed", err);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const page = getPageName();
  const keyword = pageKeywords[page] || "international students";
  loadBanner(keyword);
  // loadAside("compass globe travel"); // only if aside has an image
});
