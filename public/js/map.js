// HERE map setup
var platform = new H.service.Platform({
  apikey: mapToken,
});
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    zoom: 12,
    center: {
      lat: coordinates[0],
      lng: coordinates[1],
    },
  }
);
var ui = H.ui.UI.createDefault(map, defaultLayers);
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);

// Create a custom icon for the marker using a public URL
const icon = new H.map.Icon(
  "https://img.icons8.com/ios-filled/50/000000/marker.png"
); // Free marker icon

// Create and add a marker using the custom icon
const marker = new H.map.Marker(
  {
    lat: coordinates[0],
    lng: coordinates[1],
  },
  { icon: icon }
);
map.addObject(marker); // Add the marker to the map

// Create the info bubble but keep it hidden initially
let hoverBubble = new H.ui.InfoBubble(marker.getGeometry(), {
  content: `<p>Exact Location provided after booking</p>`,
});
ui.addBubble(hoverBubble);
hoverBubble.close(); // Keep the bubble closed initially

// Event listeners to show the bubble on hover and hide it when the mouse leaves
marker.addEventListener("pointerenter", function () {
  hoverBubble.setPosition(marker.getGeometry()); // Update bubble position to marker's
  hoverBubble.open(); // Show the bubble when hovering
});

marker.addEventListener("pointerleave", function () {
  hoverBubble.close(); // Hide the bubble when not hovering
});
