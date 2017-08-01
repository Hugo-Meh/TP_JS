'use strict';
// when DOM ready
const INSER_DONNEE = "<tr><td><input type='radio' name='donne' ></td><td class='long'>(long)" +
    "</td><td class='lat'>(lat)</td><td class='user'>(user)</td><td class='date'>(date)</td></tr>";
let id_tab = $("#donnee_enregistree");
let button_table = $("#chercher_coord");
let ls = localStorage;

function date() {
    let date = new Date();
    console.log(date.toDateString());
    date = date.toDateString();
    return date;
}

//constructeur des coordonnees GPS
function Releve(lat, long, data) {
    this.lat  = lat;
    this.long = long;
    this.data = data;
    this.date = date();
}

//ajouter des Coordonnes dans un tableau
function ajouter_coord(donnee) {
    let markup = INSER_DONNEE
        .replace("(long)", donnee.long)
        .replace("(lat)", donnee.lat)
        .replace("(user)", donnee.data)
        .replace("(date)", donnee.date)
    $(markup).appendTo(id_tab);
}


//aller sur une addresse à partir de coordonne gps choisi sur un tableau
function recuperer_coord_gps() {
    let cont_parent = id_tab.find("input:checked").parent().parent();
    let lat = parseFloat(cont_parent.find(".lat").text());
    let lng = parseFloat(cont_parent.find(".long").text());
    console.log("fonction recuperer touche", {lat: lat, lng: lng})
    return {lat: lat, lng: lng};

}


$(window).on('unload', function () {
    sauvegarder_storage();
});

//fonction sauvegarde au local storage

function sauvegarder_storage() {
    let tab_tr = id_tab.children("tr");
    let data_storage = [];
    ls.clear();

    if (tab_tr.length > 0) {
        tab_tr.each(function (index, elem) {
            data_storage.push({
                "long": $(elem).children(".long").text(),
                "lat": $(elem).children(".lat").text(),
                "data": $(elem).children(".user").text(),
                "date": $(elem).children(".date").text(),
            })
        })
    }
    ls.setItem("list_data", JSON.stringify(data_storage));
}

// remplir le tableau des donnees avec les données enregistre dans le storage
function charger_storage() {
    let data_storage = ls.getItem("list_data");

    if (data_storage !== null) {

        data_storage = JSON.parse(data_storage);
        id_tab.empty();
        for (let i = 0; i <data_storage.length; i++) {
            console.log(data_storage[i]);
            ajouter_coord(data_storage[i]);
        }
    }
}
/*if(ls.getItem("data_list")!==null)
    $("#actualiser").desabled=true;
else $("#actualiser").desabled=false;
*/

$("#actualiser").on("click", function () {

    charger_storage();
})