var places;
var markers = [];

var icons = {
  "laboratorio"     : "#5c73a8", //azul escuro
  "educacaopublica" : "#05a6eb", //azul claro
  "educacaoprivada" : "#05a6eb", //azul claro
  "setorpublico"    : "#05a6eb", //azul claro
  "coletivo"        : "#05a6eb", //azul claro
  "ong"             : "#05a6eb", //azul claro
  "empresa"         : "#05a6eb"  //azul claro
}

var mainmap = L.map('mainmap').setView([-23.550190, -46.633357], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiZmFibGFibGl2cmVzcCIsImEiOiJjamt5NGE2NnQwZmtpM3FsN3FqcW0wamRxIn0.o8WeEKKTVHgdYL_MaqtZ7g'
}).addTo(mainmap);

mainmap.zoomControl.setPosition('topright');

function loadJSONfile(callback) {
	var request = new XMLHttpRequest();
	request.overrideMimeType("application/json");
	request.open('GET', 'data.json', true);
	request.onreadystatechange = function () {
		if (request.readyState == 4 && request.status == 200) {
			callback(request.responseText);
		}
	}

	request.send(null);
}

$(document).ready(function() {
  loadJSONfile(function(response){
		places = JSON.parse(response);
    for (place in places) {
      markers.push(L.marker([places[place].latitude, places[place].longitude], {icon: L.MakiMarkers.icon({color: icons[places[place].category], size: "m"})}).addTo(mainmap));
    }
	});

  $("#info").delay(700).animate({"opacity" : 1}, {duration: 800, complete: function() {
    $(".leaflet-marker-pane").delay(100).animate({"opacity" : 1}, {duration: 800, complete: function() {
      $(markers).on("click", function(e){
        //armazena o index do item clicado
        var index = $(markers).index(this);
        L.popup({
          closeButton: false,
          autoClose: false
        })
        .setLatLng([e.target._latlng.lat, e.target._latlng.lng])
        .setContent(places[index].name.toUpperCase() + "<br>" + places[index].address)
        .openOn(mainmap);
      })
    }});
  }});
});
