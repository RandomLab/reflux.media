
//----------------------------- Stockage des variables externes ici
var compteurZindex = 0;
var activeDiv;
var posX;
var posY;
var departOK = false;
var articles;
var tableauCouleurs = ["mediumslateblue", "magenta", "paleturquoise", "lime", "aquamarine", "lavender"]

window.addEventListener("load", setup);

function setup() {

  //----------------------------- Première étape: Récuperer les titres et les textes dans le HTML
  var tableauTitre = [];
  var tableauTexte = [];
  var titres = document.getElementsByClassName("titres");
  var textes = document.getElementsByClassName("textes");
  //----------------------------- Couleur des titres des dossiers
  var titreRubrique = document.getElementsByClassName("titreRubrique");
  for (var i = 0; i < titreRubrique.length; i++) {
    if(titreRubrique[i].innerHTML == "politique"){
      titreRubrique[i].style.color = tableauCouleurs[0];
    }
    if(titreRubrique[i].innerHTML == "culture"){
      titreRubrique[i].style.color = tableauCouleurs[1];
    }
    if(titreRubrique[i].innerHTML == "ressources"){
      titreRubrique[i].style.color = tableauCouleurs[2];
    }
    if(titreRubrique[i].innerHTML == "exebition"){
      titreRubrique[i].style.color = tableauCouleurs[3];
    }
    if(titreRubrique[i].innerHTML == "tools"){
      titreRubrique[i].style.color = tableauCouleurs[4];
    }
    if(titreRubrique[i].innerHTML == "varia"){
      titreRubrique[i].style.color =  tableauCouleurs[5];
    }
  }

  articles = document.getElementsByClassName("articles");

  //----------------------------- Stockage des titres et des textes dans des tableaux?
  for(i=0; i<titres.length; i++){
    tableauTitre.push(document.getElementById('Titre' + i));
  }
  for(i=0; i<textes.length; i++){
    tableauTexte.push(document.getElementById('Texte' + i));
  }

  //----------------------------- Déplacement des articles aléatoirement et application des couleurs
  modifyArticles();

  //----------------------------- Création du menu
  for (var i = 0; i < titres.length; i++) {
    creationMenu(tableauTitre[i]);
  }

  //----------------------------- Interaction sur les fenêtres
  document.addEventListener("mousemove", onMouseMove);
  for (var i = 0; i < articles.length; i++) {
    articles[i].addEventListener("mousedown", departDuDrag);
    articles[i].addEventListener("mouseup", finDuMouvement);
    articles[i].customIndex = i;
  }
  var croix = document.getElementsByClassName("croix");
  for (var i = 0; i < croix.length; i++) {
    croix[i].addEventListener("click", closeWindow);
    croix[i].customIndex = i;
  }

  //----------------------------- Ouvrir les articles en cliquant sur les titres du menu

  function ouvrirArticle(){
    // récuperer le titre de l'article, la date, et le contenu
    // création d'une fenêtre pour les contenus
  }

}

function closeWindow(e){
  activeDiv = e.target;
  articles[activeDiv.customIndex].style.display = "none";
}

//----------------------------- LES FONCTIONS ICI !

function creationMenu(titre){
  //création de la  articles
  var menu = document.getElementById("menu");
  var createTitre = document.createElement("div");
  createTitre.classList = "boiteTitre";
  createTitre.innerHTML = titre.innerHTML;

  var politique = document.getElementById("politique");
  var culture = document.getElementById("culture");
  var ressources = document.getElementById("ressources");
  var exebition = document.getElementById("exebition");
  var tools = document.getElementById("tools");
  var varia = document.getElementById("varia");

  if(titre.classList[1] == "politique"){
    politique.appendChild(createTitre);
  }
  if(titre.classList[1] == "culture"){
    culture.appendChild(createTitre);
  }
  if(titre.classList[1] == "ressources"){
    ressources.appendChild(createTitre);
  }
  if(titre.classList[1] == "exebition"){
    exebition.appendChild(createTitre);
  }
  if(titre.classList[1] == "tools"){
    tools.appendChild(createTitre);
  }
  if(titre.classList[1] == "varia"){
    varia.appendChild(createTitre);
  }
}

function modifyArticles(){

  var titres = document.getElementsByClassName("titres");

  for (var i = 0; i < articles.length; i++) {
    compteurZindex++;
    articles[i].style.top = getRandomFromTo(0, 30)+"vh";
    articles[i].style.left =  getRandomFromTo(0, 50)+"vw";
    // articles[i].style.backgroundColor = GetRandomFromArray(tableauCouleurs);
    if(titres[i].classList[1] == "politique"){
      articles[i].style.backgroundColor = tableauCouleurs[0];
    }
    if(titres[i].classList[1] == "culture"){
      articles[i].style.backgroundColor = tableauCouleurs[1];
    }
    if(titres[i].classList[1] == "ressources"){
      articles[i].style.backgroundColor = tableauCouleurs[2];
    }
    if(titres[i].classList[1] == "exebition"){
      articles[i].style.backgroundColor = tableauCouleurs[3];
    }
    if(titres[i].classList[1] == "tools"){
      articles[i].style.backgroundColor = tableauCouleurs[4];
    }
    if(titres[i].classList[1] == "varia"){
      articles[i].style.backgroundColor = tableauCouleurs[5];
    }

    articles[i].style.zIndex = compteurZindex;
  }
}

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function departDuDrag(e){
  departOK = true;
  activeDiv = e.target;
  posX = e.clientX - articles[activeDiv.customIndex].getBoundingClientRect().left;
  posY = e.clientY - articles[activeDiv.customIndex].getBoundingClientRect().top;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].style.zIndex > articles[activeDiv.customIndex].style.zIndex){
      articles[i].style.zIndex = articles[i].style.zIndex - 1;
    }
  }
  articles[activeDiv.customIndex].style.zIndex = compteurZindex;
}

function moveAt(pageX, pageY){
  if(departOK){
    articles[activeDiv.customIndex].style.left = pageX - posX + 'px';
    articles[activeDiv.customIndex].style.top = pageY - posY + 'px';
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
