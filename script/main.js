'use strict';
// when DOM ready
const INSER_DONNEE="<tr><td><input type='radio' name='donne' ></td><td class='long'>" +
    "</td><td class='lat'></td><td class='user'></td><td class='date'></td></tr>";
let id_tab=$("#donnee_enregistree");
let button_table=$("#chercher_coord");
   //constructeur des coordonnees GPS
    function Releve(lat,long,data) {
    this.lat=lat;
    this.long=long;
    this.data=data;
    this.date=Date.now();

}

//ajouter des Coordonnes dans un tableau
function ajouter_coord(donnee){
    id_tab.append(INSER_DONNEE);
    id_tab.find('.long').last().text(donnee.long);
    id_tab.find('.lat').last().text(donnee.lat);
    id_tab.find('.user').last().text(donnee.data);
    id_tab.find('.date').last().text(donnee.date);
}




//aller sur une addresse à partir de coordonne gps choisi sur un tableau
function recuperer_coord_gps(){
    let cont_parent=id_tab.find("input:checked").parent().parent();
    let lat=parseFloat(cont_parent.find(".lat").text());
    let lng=parseFloat(cont_parent.find(".long").text());
    console.log("fonction recuperer touche",{lat:lat,lng:lng})
    return{lat:lat,lng:lng};

}

//fonction sauvegarde au local storage

$(window).on('unload', function(){
    console.log("fermer la page");
});





