// map.js (for Team page only)
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: { lat: 39.8283, lng: -98.5795 }, // Center of USA
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
    {
      city: "Louisville, KY",
      position: { lat: 38.2527, lng: -85.7585 },
      link: "https://maps.app.goo.gl/pQCt7Z7UyJ4PBsLn9?g_st=ipc",
    },
    {
      city: "Newport, KY",
      position: { lat: 39.0914, lng: -84.4958 },
      link: "https://maps.app.goo.gl/62cP2vq3ajCo5BQC8?g_st=ipc",
    },
    {
      city: "Boston, MA",
      position: { lat: 42.3601, lng: -71.0589 },
      link: "https://www.google.com/maps/place/Boston,+MA",
    },
    {
      city: "Philadelphia, PA",
      position: { lat: 39.9526, lng: -75.1652 },
      link: "https://www.google.com/maps/place/Philadelphia,+PA",
    },
    {
      city: "New Jersey",
      position: { lat: 40.0583, lng: -74.4057 },
      link: "https://www.google.com/maps/place/New+Jersey",
    },
    {
      city: "New York",
      position: { lat: 40.7128, lng: -74.006 },
      link: "https://www.google.com/maps/place/New+York,+NY",
    },
    {
      city: "Washington, DC",
      position: { lat: 38.9072, lng: -77.0369 },
      link: "https://www.google.com/maps/place/Washington,+DC",
    },
    {
      city: "Virginia",
      position: { lat: 37.4316, lng: -78.6569 },
      link: "https://www.google.com/maps/place/Virginia",
    },
    {
      city: "Baltimore, MD",
      position: { lat: 39.2904, lng: -76.6122 },
      link: "https://www.google.com/maps/place/Baltimore,+MD",
    },
    {
      city: "North Carolina",
      position: { lat: 35.7596, lng: -79.0193 },
      link: "https://www.google.com/maps/place/North+Carolina",
    },
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

  // Marker clustering
  new markerClusterer.MarkerClusterer({ map, markers });
}
