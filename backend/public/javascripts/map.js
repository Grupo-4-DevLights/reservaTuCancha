// Crea el mapa y establece la ubicación y el nivel de zoom iniciales
var mymap = L.map('mapid').setView([-27.4565444071544, -58.98693451283675], 13);

// Agrega una capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
}).addTo(mymap);

// Agrega un marcador en una ubicación específica
var marker = L.marker([-27.4565444071544, -58.98693451283675]).addTo(mymap);