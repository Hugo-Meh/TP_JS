'use strict';
let map, infoWindow;

function initMap() {
    console.log("initmaps")
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.544, lng:-73.640},
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.HYBRID,
    });
    infoWindow = new google.maps.InfoWindow;

// ajoute les coordonnee d'un click donnée au tableau
    let tab_coord = [];
    google.maps.event.addListener(map, 'click', function (event) {
        alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());


        let donnee = new Releve(event.latLng.lat(), event.latLng.lng(), "donnee");
        console.log(donnee);
        //sauvegarder les element dans un tableau
        tab_coord.push(donnee) ;
        //ajout de chaque nouveau coordonnee dans un table dans le html
       ajouter_coord(donnee);
    });


// Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            console.log(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
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





    document.getElementById("chercher_coord").onclick=function(){

        let pos=recuperer_coord_gps();


        infoWindow.setPosition(pos);
        console.log(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);


    };


    //fin a ne pas depasser
}
