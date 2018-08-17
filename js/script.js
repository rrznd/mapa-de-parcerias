var mainmap = L.map('mainmap').setView([-23.550190, -46.633357], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.outdoors',
    accessToken: 'pk.eyJ1IjoiZmFibGFibGl2cmVzcCIsImEiOiJjamt5NGE2NnQwZmtpM3FsN3FqcW0wamRxIn0.o8WeEKKTVHgdYL_MaqtZ7g'
}).addTo(mainmap);
