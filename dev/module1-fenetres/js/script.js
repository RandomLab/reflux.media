

// Premier Module
// 1. Création de fenêtres avec des textes à l'intérieur.
//    fonction random pour les couleurs

// 2. Les rendre cliquables et passage au premier plan



window.addEventListener("load", setup);

var compteurZindex = 0;

var couleurs = ["red", "fuchsia", "grey", "yellow"]

var titre = ["Titre 1", "Titre 2", "Titre 3", "Titre 4", "Titre 5"]
var texte = ["texte 1", "texte 2", "texte 3", "texte 4", "texte 5"]

var fenetres = document.getElementsByClassName("fenetre");
var activeDiv;

function setup() {

  // Charger 5 fenêtres les unes au dessus des autres
  // faire une classe avec les propriété de fenêtre et créer 5 fenetre
  // un compteur de zIndex

  for (var i = 0; i < 5; i++) {
    creationFenetre(titre[i],texte[i]);
  }

  for (var i = 0; i < fenetres.length; i++) {
    fenetres[i].addEventListener("click", premierPlan);
    fenetres[i].customIndex = i;
  }

}

function premierPlan(e){
  activeDiv = e.target;

  // Récupérer les zIndex des fenetres.
  // Je clique sur la fenetre, elle prend l'index le plus haut = 5
  // toutes les autre fenèetre plus "haute" que celle qu'on à cliquée baisse d'un zIndex.

  for (var i = 0; i < fenetres.length; i++) {
    //si les fenetres sont plus haute que celle que l'on vient de cliquer
    if (fenetres[i].style.zIndex > fenetres[activeDiv.customIndex].style.zIndex){
      //toutes les fenetres on leur index - 1
      fenetres[i].style.zIndex = fenetres[i].style.zIndex - 1;
    }
  }
  fenetres[activeDiv.customIndex].style.zIndex = compteurZindex;
}

function creationFenetre(titre, texte){
  compteurZindex++;
  var couleur = GetRandomFromArray(couleurs);
  var createFenetre = document.createElement("div");
  createFenetre.classList = "fenetre";
  createFenetre.style.width = 30 + "vw";
  createFenetre.style.height = 30 + "vw";
  createFenetre.style.top = getRandomFromTo(0, 30)+"vh";
  createFenetre.style.left =  getRandomFromTo(0, 50)+"vw";
  createFenetre.style.backgroundColor = couleur;
  createFenetre.style.zIndex = compteurZindex;
  var classattrib = "0px 0px 10px 10px grey";
  createFenetre.style.boxShadow = classattrib;
  document.body.appendChild(createFenetre)

  var createTitre = document.createElement("div");
  var createTexte = document.createElement("div");
  createTitre.innerHTML = titre;
  createTexte.innerHTML = texte;
  createTitre.classList = "titre";
  createTexte.classList = "texte";
  createFenetre.appendChild(createTitre)
  createFenetre.appendChild(createTexte)
}

// Utilitaires Random

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
