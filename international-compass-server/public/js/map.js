// Handle local vs production API
const API_BASE =
  window.location.hostname === "localhost" ? "http://localhost:5001" : "";

// Load Google Maps Script using backend key
function loadGoogleMaps() {
  fetch(`${API_BASE}/google-maps-key`)
    .then((res) => res.json())
    .then((data) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${data.key}&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);
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
    .then((res) => res.json())
    .then((locations) => {
      let activeInfoWindow = null;

      const markers = locations.map((location) => {
        const marker = new google.maps.Marker({
          position: location.position,
          map: map,
          title: location.city,
        });

        const infoWindow = new google.maps.InfoWindow({
          content: `<div style="font-size:14px;">
                      <strong>${location.city}</strong><br>
                      <a href="${location.link}" target="_blank">View on Google Maps</a>
                    </div>`,
        });

        marker.addListener("click", () => {
          if (activeInfoWindow) activeInfoWindow.close();
          infoWindow.open(map, marker);
          activeInfoWindow = infoWindow;
        });

        return marker;
      });

      new markerClusterer.MarkerClusterer({ map, markers });
    })
    .catch((err) => console.error("Failed to load locations.json", err));
}
