
//----------------------------- Stockage des variables externes ici
var compteurZindex = 0;
var activeDiv;
var posX;
var posY;
var departOK = false;
var articles;
var tableauCouleurs = ["mediumslateblue", "magenta", "paleturquoise", "lime", "aquamarine", "lavender"]
var clickMenu = false;

window.addEventListener("load", setup);

function setup() {

    //----------------------------- Première étape: Récuperer les titres et les textes dans le HTML
    var titres = document.getElementsByClassName("titres");
    var textes = document.getElementsByClassName("textes");
    //----------------------------- Couleur des titres des dossiers dans le menu
    var titreRubrique = document.getElementsByClassName("titreRubrique");

    for (var i = 0; i < titreRubrique.length; i++) {
        if(titreRubrique[i].innerHTML == "politique"){
        titreRubrique[i].style.color = tableauCouleurs[0];
        }
        if(titreRubrique[i].innerHTML == "culture"){
        titreRubrique[i].style.color = tableauCouleurs[1];
        }
        if(titreRubrique[i].innerHTML == "varia"){
        titreRubrique[i].style.color = tableauCouleurs[2];
        }
        if(titreRubrique[i].innerHTML == "exebition"){
        titreRubrique[i].style.color = tableauCouleurs[3];
        }
        if(titreRubrique[i].innerHTML == "tools"){
        titreRubrique[i].style.color = tableauCouleurs[4];
        }
        if(titreRubrique[i].innerHTML == "ressources"){
        titreRubrique[i].style.color =  tableauCouleurs[5];
        }
    }

    articles = document.getElementsByClassName("articles");

    //----------------------------- Appartition des 5 derniers articles
    // Positionnement des articles aléatoire et application des couleurs
    modifyArticles();

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

    //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* CREATION DU MENU
    for (var i = 0; i < titres.length; i++) {
        creationMenu(titres[i]);
    }
    //----------------------------- Déployer les titres des articles au survol sur le titre du menu
    var titreRubrique = document.getElementsByClassName("titreRubrique");
    for (var i = 0; i < titreRubrique.length; i++) {
        titreRubrique[i].addEventListener("mouseenter", displayTitres);
        titreRubrique[i].addEventListener("mouseleave", hideTitres);
        titreRubrique[i].addEventListener("click", stuckTitres);
    }
    //----------------------------- Ouvrir les articles en cliquant sur les titres du menu



}


//----------------------------- LES FONCTIONS ICI !

function creationMenu(titre){

    var menu = document.getElementById("menu");
    var createTitre = document.createElement("div");

    createTitre.classList = "boiteTitre";

    if(titre.innerHTML.length > 10)createTitre.innerHTML = titre.innerHTML.substring(0,20) + "...";


    var politique = document.getElementById("politique");
    var culture = document.getElementById("culture");
    var ressources = document.getElementById("ressources");
    var exebition = document.getElementById("exebition");
    var tools = document.getElementById("tools");
    var varia = document.getElementById("varia");

    // if(titre.classList[1].includes("politique")){
    //     politique.appendChild(createTitre);
    // }
    // if(titre.classList[1].includes("culture")){
    //     culture.appendChild(createTitre);
    // }
    // if(titre.classList[1].includes("ressources")){
    //     ressources.appendChild(createTitre);
    // }
    // if(titre.classList[1].includes("exebition")){
    //     exebition.appendChild(createTitre);
    // }
    // if(titre.classList[1].includes("tools")){
    //     tools.appendChild(createTitre);
    // }
    // if(titre.classList[1].includes("varia")){
    //     varia.appendChild(createTitre);
    // }
}

function displayTitres(e){
    const children = e.target.parentNode.children;
    Array.from(children).forEach(div => {
        div.style.display = "block";
    });
}

var compteurMenu = 0;

function hideTitres(e){
  if (clickMenu != true){
    const children = e.target.parentNode.children;
    Array.from(children).forEach(div => {
      if(div.classList != "titreRubrique"){
          div.style.display = "none";
      }
    });
  }

}

function stuckTitres(e){

  compteurMenu++;
const children = e.target.parentNode.children;
  if ( compteurMenu == 1){
    clickMenu = true;

    Array.from(children).forEach(div => {
      if(div.classList != "titreRubrique"){
          div.style.display = "block";
      }
    });
  } else if (compteurMenu == 2){
    compteurMenu = 0;
    clickMenu = false;
    Array.from(children).forEach(div => {
      if(div.classList != "titreRubrique"){
          div.style.display = "none";
      }
    });
  }

}
function ouvrirArticle(){
  // récuperer le titre de l'article, la date, et le contenu
  // création d'une fenêtre pour les contenus
}

function closeWindow(e){
  activeDiv = e.target;
  articles[activeDiv.customIndex].style.display = "none";
}

function modifyArticles(){

    var titres = document.getElementsByClassName("titres");

    articles[articles.length-1].style.display = "block";
    articles[articles.length-2].style.display = "block";
    articles[articles.length-3].style.display = "block";
    articles[articles.length-4].style.display = "block";
    articles[articles.length-5].style.display = "block";

    for (var i = 0; i < articles.length; i++) {

        // "FooBar".includes("oo");
        compteurZindex++;
        articles[i].style.top = getRandomFromTo(0, 30)+"vh";
        articles[i].style.left =  getRandomFromTo(0, 50)+"vw";

        // articles[i].style.backgroundColor = GetRandomFromArray(tableauCouleurs);

        // if(titres[i].classList[1].includes("politique")){
        //     articles[i].style.backgroundColor = tableauCouleurs[0];
        // }

        // if(titres[i].classList[1].includes("culture")){
        //     articles[i].style.backgroundColor = tableauCouleurs[1];
        // }

        // if(titres[i].classList[1].includes("varia")){
        //     articles[i].style.backgroundColor = tableauCouleurs[2];
        // }

        // if(titres[i].classList[1].includes("exebition")){
        // articles[i].style.backgroundColor = tableauCouleurs[3];
        // }
        // if(titres[i].classList[1].includes("tools")){
        // articles[i].style.backgroundColor = tableauCouleurs[4];
        // }
        // if(titres[i].classList[1].includes("ressources")){
        // articles[i].style.backgroundColor = tableauCouleurs[5];
        // }
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
