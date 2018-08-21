labs = [
  [-23.5801259, -46.3898429],
  [-23.6221722, -46.5907948],
  [-23.5982488, -46.7443205],
  [-23.561983, -46.6410815],
  [-23.5434534, -46.6390541],
  [-23.5357699, -46.45534070000001],
  [-23.5258714, -46.5484253],
  [-23.5714751, -46.6402144],
  [-23.6869926, -46.7495015],
  [-23.4397843, -46.7871379],
  [-23.4760977, -46.6702593],
  [-23.478372, -46.3813019]
]

var mainmap = L.map('mainmap').setView([-23.550190, -46.633357], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiZmFibGFibGl2cmVzcCIsImEiOiJjamt5NGE2NnQwZmtpM3FsN3FqcW0wamRxIn0.o8WeEKKTVHgdYL_MaqtZ7g'
}).addTo(mainmap);

mainmap.zoomControl.setPosition('topright');

$(document).ready(function() {

  for (lab in labs) {
      L.marker(labs[lab]).addTo(mainmap);
  }

  $(".leaflet-marker-pane").delay(700).animate({"opacity" : 1}, {duration: 800, complete: function() {
    $(".leaflet-shadow-pane").delay(100).animate({"opacity" : 1}, {duration: 500, complete: function() {
        $("#info").animate({"opacity" : 1}, 800);
    }});
  }});
});
