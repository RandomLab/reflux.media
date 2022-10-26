
//----------------------------- Déroulé du script
// 0 - Charger la page
// 1 - Récuperer les titres et les textes qui sont dans le HTML
// 2 - Créer une fonction qui va générer des fenêtres - mettre les titres et les textes dedans
// 3 - Les fenêtres ont aussi un zIndex
// 4 - Les fenêtres sont cliquables et elles passent au premier plan quand on clique dessus

//----------------------------- Stockage des variables externes ici
var compteurZindex = 0;
var fenetres = document.getElementsByClassName("fenetre");
var activeDiv;

// Écouteurs d'évènement, "chargement", lance la fonction "setup"
window.addEventListener("load", setup);

// la fonction setup
function setup() {

  //----------------------------- Première étape: Récuperer les titres et les textes dans le HTML
  var tableauTitre = [];
  var tableauTexte = [];

  var titres = document.getElementsByClassName("titres");
  var textes = document.getElementsByClassName("textes");

  for(i=0; i< titres.length; i++){
    tableauTitre.push(document.getElementById('Titre' + i));
  }

  for(i=0; i<textes.length; i++){
    tableauTexte.push(document.getElementById('Texte' + i));
  }

  //----------------------------- Deuxième étape: Création d'une fonction qui va générer des fenêtres
  for (var i = 0; i < titres.length; i++) {
    creationFenetre(tableauTitre[i],tableauTexte[i]);
  }
  //----------------------------- Troisième étape: Les fenêtres sont cliquables et elles passent au premier plan
  for (var i = 0; i < fenetres.length; i++) {
    fenetres[i].addEventListener("click", premierPlan);
    fenetres[i].customIndex = i;
  }
}

//----------------------------- LES FONCTIONS ICI !

function creationFenetre(titre, texte){
  compteurZindex++;
  var tableauCouleurs = ["red", "fuchsia", "grey", "yellow"]
  var couleur = GetRandomFromArray(tableauCouleurs);
  // Création de la createFenetre
  var createFenetre = document.createElement("div");
  createFenetre.classList = "fenetre";
  createFenetre.style.top = getRandomFromTo(0, 30)+"vh";
  createFenetre.style.left =  getRandomFromTo(0, 30)+"vw";
  createFenetre.style.backgroundColor = couleur;
  createFenetre.style.zIndex = compteurZindex;
  document.body.appendChild(createFenetre)
  createFenetre.appendChild(titre)
  createFenetre.appendChild(texte)
}

function premierPlan(e){
  activeDiv = e.target;
  // Récupérer les zIndex des fenetres.
  // Je clique sur la fenetre, elle prend l'index le plus haut = 5
  // toutes les autre fenêtre plus "haute" que celle qu'on à cliquée baisse d'un zIndex.
  for (var i = 0; i < fenetres.length; i++) {
    //si les fenetres sont plus haute que celle que l'on vient de cliquer
    if (fenetres[i].style.zIndex > fenetres[activeDiv.customIndex].style.zIndex){
      //toutes les fenetres on leur index - 1
      fenetres[i].style.zIndex = fenetres[i].style.zIndex - 1;
    }
  }
  fenetres[activeDiv.customIndex].style.zIndex = compteurZindex;
}

// ----------------------------- LES UTILITAIRES ICI !

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
