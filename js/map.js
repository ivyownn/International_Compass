function loadGoogleMaps() {
  fetch("/google-maps-key")
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

  const locations = [
    {
      city: "Minneapolis, MN",
      position: { lat: 44.9778, lng: -93.265 },
      link: "https://maps.app.goo.gl/j3N9eMAo7G6zQ2576?g_st=ipc",
    },
    {
      city: "Manassas, VA",
      position: { lat: 38.7509, lng: -77.4753 },
      link: "https://maps.app.goo.gl/Qc69ZDtJcZZH5kzS7?g_st=ipc",
    },
    // add all your other locations...
  ];

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
}
