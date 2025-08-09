// Handle local vs production API
const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://international-compass.onrender.com";

// Load Google Maps Script using backend key
function loadGoogleMaps() {
  fetch(`${API_BASE}/google-maps-key`)
    .then((res) => res.json())
    .then((data) => {
      if (!data.key) {
        console.error("Google Maps API key missing from backend");
        return;
      }
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&callback=initMap`;
      script.async = true;
      script.defer = true; // safer async loading
      document.head.appendChild(script);
      console.log("Google Maps script requested from backend key");
    })
    .catch((err) => console.error("Failed to load Google Maps API key", err));
}

document.addEventListener("DOMContentLoaded", loadGoogleMaps);

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 39.8283, lng: -98.5795 },
    styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
  });

  // Load locations from JSON file
  fetch("locations.json")
    .then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch locations.json: ${res.status}`);
      return res.json();
    })
    .then((locations) => {
      let activeInfoWindow = null;

      const markers = locations.map((location) => {
        const marker = new google.maps.Marker({
          position: location.position,
          map,
          title: location.city,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-size:14px;">
                      <strong>${location.city}</strong><br>
                      <a href="${location.link}" target="_blank">View on Google Maps</a>
                    </div>`,
        });

        marker.addListener("clic