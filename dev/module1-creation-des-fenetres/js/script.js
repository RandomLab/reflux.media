
//----------------------------- Déroulé du script
// 0 - Charger la page
// 1 - Récuperer les titres et les textes qui sont dans le HTML
// 2 - Créer une fonction qui va générer des fenêtres - mettre les titres et les textes dedans

// Écouteurs d'évènement, "chargement", lance la fonction "setup"
window.addEventListener("load", fonctionDeChargement);

// La fonction setup
function fonctionDeChargement() {

  //----------------------------- Première étape
  // 1 - Récuperer les titres qui sont dans des balises <div></div> dans le html
  // Créer une variable "tableauTitre" qui contient des crochets [] - on appelle ça un tableau:
  // une variable dans laquelle on va stocker plusieurs éléments.
  // Créer aussi une variable qui contiendra les textes
  var tableauTitre = [];
  var tableauTexte = [];
  // dans la variable titres, je récupère tout les éléments qui ont pour classe "titre"
  var titres = document.getElementsByClassName("titres");
  var textes = document.getElementsByClassName("textes");
  //console.log(titres.length);
  // Ensuite grâce à une boucle for je vais ajouter tout les éléments qui ont pour identifiant Titre + i
  for(i=0; i< titres.length; i++){
    tableauTitre.push(document.getElementById('Titre' + i));
  }
  // Je recommence en récupérant cette fois les textes
  for(i=0; i<textes.length; i++){
    tableauTexte.push(document.getElementById('Texte' + i));
  }

  //----------------------------- Deuxième étape
  // Création d'une fonction qui va générer des fenêtres
  for (var i = 0; i < titres.length; i++) {
    creationFenetre(tableauTitre[i],tableauTexte[i]);
  }
}

function creationFenetre(titre, texte){
  var tableauCouleurs = ["red", "fuchsia", "grey", "yellow"]
  var couleur = GetRandomFromArray(tableauCouleurs);
  var createFenetre = document.createElement("div");
  createFenetre.classList = "fenetre";
  createFenetre.style.top = getRandomFromTo(0, 80)+"vh";
  createFenetre.style.left =  getRandomFromTo(0, 80)+"vw";
  createFenetre.style.backgroundColor = couleur;
  document.body.appendChild(createFenetre)
  createFenetre.appendChild(titre)
  createFenetre.appendChild(texte)
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
