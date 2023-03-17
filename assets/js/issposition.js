var issIcon = L.icon({
    iconUrl: "assets/img/ISS.png",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
});

const myMap = L.map('ISSmap').setView([51.5074, -0.1278], 5);
const myMarker = L.marker([0, 0],{icon:issIcon}).addTo(myMap);
const polyLines = L.polyline([], {color: "red"}).addTo(myMap);

function setup() {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2lyZm91cmllciIsImEiOiJja2dheG93d28wYm0wMnpwZHd4eWc3MmFuIn0.zyjkFt9TN-jvU2isE28xrg'
    }).addTo(myMap);
}

async function getISS() {
    const ISS_API_URL = "https://api.wheretheiss.at/v1/satellites/25544"
    const response = await fetch(ISS_API_URL);
    return await response.json(); 
}

async function update() {
    const {latitude, longitude} = await getISS();
    myMarker.setLatLng([latitude, longitude]);
    
    if (document.getElementById("centerOnISS").checked) {
        myMap.flyTo([latitude, longitude]);
    }
    
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);

    polyLines.addLatLng([latitude, longitude]);
}

document.getElementById("displayPath").oninput = () => {
    if (document.getElementById("displayPath").checked) {
        polyLines.addTo(myMap);
    }  else {
        polyLines.remove();
    }
}

setup();
update();
setInterval(update, 2000);