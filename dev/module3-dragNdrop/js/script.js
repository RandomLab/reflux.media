
//----------------------------- Déroulé du script
// 0 - Charger la page
// 1 - Récuperer les titres et les textes qui sont dans le HTML
// 2 - Créer une fonction qui va générer des fenêtres - mettre les titres et les textes dedans
// 3 - Les fenêtres sont déplaçables
//        Comment?

//----------------------------- Stockage des variables externes ici
var compteurZindex = 0;
var activeDiv;
var posX;
var posY;
var departOK = false;

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
  //----------------------------- Troisième étape: Les fenêtres sont déplaçables
  document.addEventListener("mousemove", onMouseMove);

  var fenetres = document.getElementsByClassName("fenetre");
  for (var i = 0; i < fenetres.length; i++) {
    fenetres[i].addEventListener("mousedown", departDuDrag);
    fenetres[i].addEventListener("mouseup", finDuMouvement);
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
  createFenetre.style.left =  getRandomFromTo(0, 50)+"vw";
  createFenetre.style.backgroundColor = couleur;
  createFenetre.style.zIndex = compteurZindex;
  document.body.appendChild(createFenetre)
  createFenetre.appendChild(titre)
  createFenetre.appendChild(texte)
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function departDuDrag(e){
  fenetres = document.getElementsByClassName("fenetre");
  departOK = true;
  activeDiv = e.target;
  posX = e.clientX - fenetres[activeDiv.customIndex].getBoundingClientRect().left;
  posY = e.clientY - fenetres[activeDiv.customIndex].getBoundingClientRect().top;
}

function moveAt(pageX, pageY){
  if(departOK){
    fenetres[activeDiv.customIndex].style.left = pageX - posX + 'px';
    fenetres[activeDiv.customIndex].style.top = pageY - posY + 'px';
  }
}


function finDuMouvement(){
  departOK = false;
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
