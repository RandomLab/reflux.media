
//----------------------------- Stockage des variables externes ici
var compteurZindex = 3;
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
  var categoriesTitles = document.getElementsByClassName("categoriesTitles");

  for (var i = 0; i < categoriesTitles.length; i++) {
    if(categoriesTitles[i].innerHTML == "politique"){
      categoriesTitles[i].style.color = tableauCouleurs[0];
    }
    if(categoriesTitles[i].innerHTML == "culture"){
      categoriesTitles[i].style.color = tableauCouleurs[1];
    }
    if(categoriesTitles[i].innerHTML == "varia"){
      categoriesTitles[i].style.color = tableauCouleurs[2];
    }
    if(categoriesTitles[i].innerHTML == "exebition"){
      categoriesTitles[i].style.color = tableauCouleurs[3];
    }
    if(categoriesTitles[i].innerHTML == "tools"){
      categoriesTitles[i].style.color = tableauCouleurs[4];
    }
    if(categoriesTitles[i].innerHTML == "ressources"){
      categoriesTitles[i].style.color =  tableauCouleurs[5];
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
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*//
  //-*-*-*-*-*-*-*-*-* CREATION DU MENU
  //-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*//
  for (var i = 0; i < titres.length; i++) {
    creationMenu(titres[i]);
  }
  //Déployer les titres des articles au survol sur le titre du menu
  var categoriesTitles = document.getElementsByClassName("categoriesTitles");
  for (var i = 0; i < categoriesTitles.length; i++) {
    categoriesTitles[i].addEventListener("click", blockTitles);
  }
  //Ouvrir les articles en cliquant sur les titres du menu
  var boiteTitre = document.getElementsByClassName("boiteTitre");
  for (var i = 0; i < boiteTitre.length; i++) {
    boiteTitre[i].addEventListener("click", ouvrirArticle);
  }

}


//----------------------------- LES FONCTIONS ICI !

function creationMenu(titre){

  var menu = document.getElementById("menu");
  var createTitre = document.createElement("div");
  createTitre.classList = "boiteTitre";

  var hiddenTitle = document.createElement("div");
  hiddenTitle.classList = "hiddenTitle";
  hiddenTitle.innerHTML = titre.innerHTML;
  createTitre.innerHTML = titre.innerHTML
  // if(titre.innerHTML.length > 10)createTitre.innerHTML = titre.innerHTML.substring(0,20) + "...";

  var politique = document.getElementById("politique");
  var culture = document.getElementById("culture");
  var ressources = document.getElementById("ressources");
  var exebition = document.getElementById("exebition");
  var tools = document.getElementById("tools");
  var varia = document.getElementById("varia");

  if(titre.classList[1].includes("politique")){
    politique.appendChild(createTitre);
    politique.appendChild(hiddenTitle);
  }
  if(titre.classList[1].includes("culture")){
    culture.appendChild(createTitre);
    culture.appendChild(hiddenTitle);
  }
  if(titre.classList[1].includes("ressources")){
    ressources.appendChild(createTitre);
    ressources.appendChild(hiddenTitle);
  }
  if(titre.classList[1].includes("exebition")){
    exebition.appendChild(createTitre);
    exebition.appendChild(hiddenTitle);
  }
  if(titre.classList[1].includes("tools")){
    tools.appendChild(createTitre);
    tools.appendChild(hiddenTitle);
  }
  if(titre.classList[1].includes("varia")){
    varia.appendChild(createTitre);
    varia.appendChild(hiddenTitle);
  }
}

function blockTitles(e){
  var title = e.target;
  const children = title.parentNode.children;
  var style = window.getComputedStyle(children[1], null).getPropertyValue("display");
  if ( style == "none"){
    clickMenu = true;
    Array.from(children).forEach(div => {
      if(div.classList != "categoriesTitles" && div.classList != "hiddenTitle"){
        div.style.display = "block";
        title.style.backgroundColor = "black";
      }
    });
  } else if (style == "block"){
    clickMenu = false;
    Array.from(children).forEach(div => {
      if(div.classList != "categoriesTitles"&& div.classList != "hiddenTitle"){
        div.style.display = "none";
        title.style.backgroundColor = "black";
      }
    });
  }
}
function ouvrirArticle(e){
  // var
  // récuperer le titre de l'article, la date, et le contenu
  // création d'une fenêtre pour les contenus

  var titres = document.getElementsByClassName("titres");

  for (var i = 0; i < titres.length; i++) {
    if(titres[i].innerHTML.includes(e.target.innerHTML)){
      if(titres[i].style.display != "block"){
        const div = titres[i].parentNode;

        for (var i = 0; i < articles.length; i++) {
          articles[i].style.zIndex = articles[i].style.zIndex - 1;
          if(articles[i].style.zIndex < 0){
            articles[i].style.display = "none";
          }
        }
        div.style.zIndex = 4;
        div.style.display = "block";
      }
    }
  }
}

function closeWindow(e){
  activeDiv = e.target;
  articles[activeDiv.customIndex].style.display = "none";
}

function modifyArticles(){

  var titres = document.getElementsByClassName("titres");
  compteurZindex++
  articles[articles.length-1].style.display = "block";
  articles[articles.length-1].style.zIndex = 4;
  articles[articles.length-2].style.display = "block";
  articles[articles.length-2].style.zIndex = 3;
  articles[articles.length-3].style.display = "block";
  articles[articles.length-3].style.zIndex = 2;
  articles[articles.length-4].style.display = "block";
  articles[articles.length-4].style.zIndex = 1;
  articles[articles.length-5].style.display = "block";
  articles[articles.length-5].style.zIndex = 0;

  for (var i = 0; i < articles.length; i++) {

    articles[i].style.top = getRandomFromTo(0, 30)+"vh";
    articles[i].style.left =  getRandomFromTo(0, 50)+"vw";

    articles[i].style.backgroundColor = GetRandomFromArray(tableauCouleurs);

    if(articles[i].classList[1].includes("politique")){
      articles[i].style.backgroundColor = tableauCouleurs[0];
    }
    if(articles[i].classList[1].includes("culture")){
      articles[i].style.backgroundColor = tableauCouleurs[1];
    }
    if(articles[i].classList[1].includes("varia")){
      articles[i].style.backgroundColor = tableauCouleurs[2];
    }
    if(articles[i].classList[1].includes("exebition")){
      articles[i].style.backgroundColor = tableauCouleurs[3];
    }
    if(articles[i].classList[1].includes("tools")){
      articles[i].style.backgroundColor = tableauCouleurs[4];
    }
    if(articles[i].classList[1].includes("ressources")){
      articles[i].style.backgroundColor = tableauCouleurs[5];
    }
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
