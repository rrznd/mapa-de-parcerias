var labs;

var laboratory = L.MakiMarkers.icon({color: "#5c73a8", size: "m"}); //#b01217
//laranja #fc7814
//azuk 5c73a8
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
		labs = JSON.parse(response);
    for (lab in labs) {

      L.marker([labs[lab].latitude, labs[lab].longitude], {icon: laboratory}).addTo(mainmap);
    }
	});

  $(".leaflet-marker-pane").delay(700).animate({"opacity" : 1}, {duration: 800, complete: function() {
    $("#info").delay(100).animate({"opacity" : 1}, 800);
  }});
});
