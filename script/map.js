'use strict';
let map, infoWindow;
let pos;
let tab_coord = [];
let markers = [];
function initMap() {
    console.log("initmaps");
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.544, lng:-73.640},
        zoom: 8,
    });
    infoWindow = new google.maps.InfoWindow;
// labels pour les markers

let label1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let label2 = '123456789';

let nbLocMarker = 0 ;



/*function calcul_next_marker_label(){
    let label_ = label1[nbLocMarker %(label1.length*label2.length)]+label2[nbLocMarker %label2.length];
    nbLocMarker++;
    return label_
}*/
// ajoute les coordonnee d'un click donnée au tableau

    google.maps.event.addListener(map, 'click', function (event) {
        alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
        let donnee = new Releve(event.latLng.lat(), event.latLng.lng(), "donnee");
        console.log(donnee);
        //sauvegarder les element dans un tableau
        tab_coord.push(donnee) ;
        //ajout de chaque nouveau coordonnee dans un table dans le html
       ajouter_coord(donnee);
        let pos = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
        };
       ajouter_marker(pos);
    });

    google.maps.event.addListener(map, 'click',marker_to_table());
    let markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'Image/markercluster-png/m'});

// Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
             pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log(pos);
            map.setCenter(pos);
            add_marker_current_pos(pos);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    $("#chercher_coord").on("click",function(){

        let pos=recuperer_coord_gps();
        console.log(pos);
        map.setCenter(pos);
    });
    // ajoute les coordoner actuel
    $("#ajouter_position").on("click",function (){
        let donnee = new Releve(pos.lat, pos.lng,'donnee');
        ajouter_coord(donnee);
        ajouter_marker(pos);
    });

    function marker_to_table (){

    }

    function ajouter_marker(pos){
        let marker = new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            icon : 'Image/placeholder-tool.png',
            //label : calcul_next_marker_label(),
            map: map
        });
    }

    function add_marker_current_pos (pos){
        markers.push(new google.maps.Marker({
            position: pos,
            animation: google.maps.Animation.DROP,
            icon : 'Image/flag-map-marker.png',
            map: map,
        }));
    }
    //fin a ne pas depasser
}
