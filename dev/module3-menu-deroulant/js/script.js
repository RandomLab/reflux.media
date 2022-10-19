window.addEventListener("load", setup);

var couleurs = ["red", "fuchsia", "grey", "yellow"]

var nomsOnglets = ["Onglet 1","Onglet 2", "Onglet 3", "Onglet 4"]
var ongletSecondaire1 = ["Onglet 1 - premier onglet","Onglet 1 - deuxieme onglet", "Onglet 1 - troisieme onglet", "Onglet 1 - quatrième onglet"];
var ongletSecondaire2 = ["Onglet 2 - premier onglet","Onglet 2 - deuxieme onglet", "Onglet 2 - troisieme onglet", "Onglet 2 - quatrième onglet","Onglet 2 - cinquième onglet", "Onglet 2 - sixième onglet"];
var ongletSecondaire3 = ["Onglet 3 - premier onglet","Onglet 3 - deuxieme onglet", "Onglet 3 - troisieme onglet", "Onglet 3 - quatrième onglet","Onglet 3 - cinquième onglet", "Onglet 3 - sixième onglet"]
var ongletPrincipal;
var ongletSecondaire;
var activeDiv;

function setup() {

  var container = document.getElementById("container");

  for (var i = 0; i < 4; i++) {
    creationOngletsPrincipaux(nomsOnglets[i]);
  }
  for (var i = 0; i < ongletSecondaire1.length; i++) {
    creationOngletsSecondaire(ongletPrincipal[0], ongletSecondaire1[i]);
  }

  for (var i = 0; i < ongletSecondaire2.length; i++) {
    creationOngletsSecondaire(ongletPrincipal[1], ongletSecondaire2[i]);
  }
  for (var i = 0; i < ongletSecondaire3.length; i++) {
    creationOngletsSecondaire(ongletPrincipal[2], ongletSecondaire3[i]);
  }

  // Quand on clique sur les onglets principaux, les onglets secondaires sont déployés.
  for (var i = 0; i < ongletPrincipal.length; i++) {
    ongletPrincipal[i].addEventListener("click", deroulerLesOngletsSecondaires)
    ongletPrincipal[i].customIndex = i;
  }

}

/// création des onglets principaux
function creationOngletsPrincipaux(nomOnglet){
  var nouvelOngletPrincipal = document.createElement("div");
  nouvelOngletPrincipal.classList = "ongletPrincipal";
  nouvelOngletPrincipal.innerHTML = nomOnglet;
  container.appendChild(nouvelOngletPrincipal)
  ongletPrincipal = document.getElementsByClassName("ongletPrincipal")
}

function creationOngletsSecondaire(appartenanceOngletPrincipal, intitule){
  var nouvelOngletSecondaire = document.createElement("div");
  nouvelOngletSecondaire.classList = "ongletSecondaire";
  nouvelOngletSecondaire.innerHTML = intitule;
  appartenanceOngletPrincipal.appendChild(nouvelOngletSecondaire);

ongletSecondaire = document.getElementsByClassName("ongletSecondaire")
  // Quand on clique sur les onglets secondaire, ça ouvre un article
  // for (var i = 0; i < ongletSecondaire.length; i++) {
  //   ongletSecondaire[i].addEventListener("click", ouvrirDesArticles)
  //   ongletSecondaire[i].customIndex = i;
  // }
}

//cliquer sur les onglet principaux déroule les onglets secondaires
function deroulerLesOngletsSecondaires(e){
    // get all children
  activeDiv = e.target;
  const enfants = activeDiv.children;
  Array.from(enfants).forEach(onglets => {
    if(onglets.style.display == "" || onglets.style.display == "none"){
      onglets.style.display = "block";
    }
    else if(onglets.style.display == "block"){
      onglets.style.display = "none";
    }

  });
}

//cliquer sur les onglets secondaires ouvre des articles
function ouvrirDesArticles(){

}

// Utilitaires Random;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomFromTo(from, to) {
  const rando2 = Math.floor(Math.random() * (to - from + 1)) + from;
  return rando2;
}

function GetRandomFromArray(ArrayName) {
  var randomNumber = Math.floor(Math.random() * ArrayName.length);
  return ArrayName[randomNumber];
}
