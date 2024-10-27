// Here map second Script
var platform = new H.service.Platform({
  apikey: mapToken, //Use your HERE API key here
});
var defaultLayers = platform.createDefaultLayers();
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.vector.normal.map,
  {
    zoom: 10,
    center: { lat: 28.6139, lng: 77.209 }, // Coordinates for Delhi
  }
);
var ui = H.ui.UI.createDefault(map, defaultLayers);
var mapEvents = new H.mapevents.MapEvents(map);
var behavior = new H.mapevents.Behavior(mapEvents);
