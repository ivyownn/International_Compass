// map.js - runs on pages with #map element
(function () {
  const mapEl = document.getElementById("map");
  if (!mapEl) return; // stop if no map on page

  // Determine API base
  const API_BASE =
    window.location.hostname === "localhost"
      ? "http://localhost:5001"
      : "https://international-compass.onrender.com";

  // Fetch Google Maps API key from backend
  fetch(`${API_BASE}/google-maps-key`)
    .then((res) => res.json())
    .then(({ key }) => {
      if (!key) throw new Error("No Google Maps API key received.");

      // Dynamically load Google Maps API script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        key
      )}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    })
    .catch((err) => {
      console.error("Failed to load Google Maps API key", err);
      mapEl.innerHTML = "<p>Map failed to load.</p>";
    });

  // Global initMap callback required by Google Maps
  window.initMap = function () {
    const map = new google.maps.Map(mapEl, {
      zoom: 5,
      center: { lat: 39.8283, lng: -98.5795 }, // center of USA
      styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
      mapTypeControl: false,
      streetViewControl: false,
    });

    // Load markers from locations.json
    fetch("/js/locations.json")
      .then((res) => res.json())
      .then((locations) => {
        if (!locations || !locations.length) return;

        let activeInfoWindow = null;
        const bounds = new google.maps.LatLngBounds();

        const markers = locations.map((location) => {
          const marker = new google.maps.Marker({
            position: location.position,
            map,
            title: location.city,
          });

          if (marker.getPosition) bounds.extend(marker.getPosition());

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="info-window" style="font-size:14px;">
                <strong>${escapeHtml(location.city)}</strong><br>
                <a href="${escapeAttr(
                  location.link
                )}" target="_blank" rel="noopener">View on Google Maps</a>
              </div>
            `,
          });

          marker.addListener("click", () => {
            if (activeInfoWindow) activeInfoWindow.close();
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
          });

          return marker;
        });

        // Fit map to markers
        if (!bounds.isEmpty && !bounds.isEmpty()) {
          map.fitBounds(bounds);
        }

        // Dynamically import MarkerClusterer
        import(
          "https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"
        )
          .then(({ MarkerClusterer }) => {
            new MarkerClusterer({ map, markers });
          })
          .catch((e) => console.warn("MarkerClusterer failed to load", e));
      })
      .catch((err) => console.error("Failed to load locations.json", err));
  };

  // Helpers to escape HTML/attributes
  function escapeHtml(str = "") {
    return String(str).replace(
      /[&<>"']/g,
      (s) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[s])
    );
  }
  function escapeAttr(str = "") {
    return String(str).replace(/"/g, "&quot;");
  }
})();
