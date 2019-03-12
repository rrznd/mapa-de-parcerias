var places;
var markers = [];

var mainmap = L.map('mainmap').setView([11.528956, -8.373501], 2.5);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiY2hhbWFub2lzIiwiYSI6ImNqdDAzdnJveTBzMjQ0OXBocTJhZXl2dzEifQ.4lFsq3gcP4x8Zz3-ybQAUw'
}).addTo(mainmap);

mainmap.zoomControl.setPosition('topright');

$(document).ready(function() {
  var data00;

  var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/13hsR6JakiIKxJEYIPCoTtvJ5VhlGNruOaFXwI2k4T6k/2/public/full?alt=json';

  $.getJSON(sheetUrl, function(data){
    places = data.feed.entry;
    console.log(places);

    for (i = 2; i < places.length; i+=2) {
      if (places[i].content["$t"] !== "") {
        markers.push(L.marker([places[i].content["$t"], places[i+1].content["$t"]], {icon: L.MakiMarkers.icon({color: "#5c73a8", size: "m"})}).addTo(mainmap));
      }
    }

  $(".leaflet-marker-pane").delay(50).animate({"opacity" : 1}, {duration: 800, complete: function() {
    $(markers).on("click", function(e){
      //armazena o index do item clicado
      var index = $(markers).index(this);
      L.popup({
        closeButton: false,
        autoClose: false
      })
      .setLatLng([e.target._latlng.lat, e.target._latlng.lng])
      .setContent(places[index].name.toUpperCase() + "<br>" + places[index].address)
      //.openOn(mainmap);
    })
  }});
})

});
