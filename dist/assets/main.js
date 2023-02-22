/* /!\/!\/!\/!\/!\/!\/!\/!\/!\

/!\ Si on modifie le nom des rubriques dans le wiki, il faut le modifier dans:

generate.js
main.js
style.css

/!\/!\/!\/!\/!\/!\/!\/!\/!\ */


//----------------------------- Stockage des variables externes ici
var compteurZindex = 3; // Sert à passer les articles au premier plan

var active_div;
var active_title;

var titres;
var textes;
var titres_rubriques
var articles;
var tableauCouleurs = ["crimson", "magenta", "paleturquoise", "lime", "darkorchid", "steelblue"] // couleurs des articles en fonction de leurs rubriques

var mobile;
var ordinateur;

window.addEventListener("load", setup);

function setup() {

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  RESPONSIVE javascript
  -*-*-*-*-*-*-*-*-*-*-*-* */
  function resizing_function(x) {
    if (x.matches) { // If media query matches
      var title_gifs = document.getElementById("title_gifs");
      title_gifs.style.height = 10 + "vh";
      title_gifs.style.maxWidth = 65 + "vw";
      title_gifs.style.margin = 0 + "vh";
      mobile = true;
      ordinateur = false;
    } else {
      document.body.style.backgroundColor = "black";
      mobile = false;
      ordinateur = true;
    }
  }

  var x = window.matchMedia("(max-width: 700px)")
  resizing_function(x) // Call listener function at run time
  x.addListener(resizing_function) // Attach listener function on state changes



  var say_no_to_post_it = document.getElementById("say_no_to_post_it");
  // flying_NO();
  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Les gifs du titre reflux.media qui apparaissent random
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var title_gifs = document.getElementById("title_gifs");
  title_gifs.src = "assets/imgs/" + getRandomFromTo(1,6) + ".gif";

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Ouvrir dans un autre onglet tout les liens
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var a = document.getElementsByTagName('a');
  for (var i = 0; i < a.length; i++) {
    a[i].target = "_blank";
  }

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Drag n drop avec la librairie interact.js et aussi redimensionnement des articles
  -*-*-*-*-*-*-*-*-*-*-*-* */
  if(ordinateur){
    interact('.articles')
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },

      listeners: {
        move (event) {
          var target = event.target
          var x = (parseFloat(target.getAttribute('data-x')) || 0)
          var y = (parseFloat(target.getAttribute('data-y')) || 0)

          target.style.width = event.rect.width + 'px'
          target.style.height = event.rect.height + 'px'

          x += event.deltaRect.left
          y += event.deltaRect.top

          target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)
        }
      },
      modifiers: [
        interact.modifiers.restrictEdges({
          outer: 'parent'
        }),
        interact.modifiers.restrictSize({
          min: { width: 100, height: 50 }
        })
      ],

      inertia: true
    })
    .draggable({
      inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true
        })
      ],
      autoScroll: true,

      listeners: {
        move: dragMoveListener,
        end (event) {
        }
      }
    })
    function dragMoveListener (event) {
      var target = event.target

      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

    }
    window.dragMoveListener = dragMoveListener
  }


  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Récuperer les titres et les textes dans le HTML
  -*-*-*-*-*-*-*-*-*-*-*-* */
  titres = document.getElementsByClassName("titres");
  textes = document.getElementsByClassName("textes");
  titres_rubriques = document.getElementsByClassName("titres_rubriques");
  articles = document.getElementsByClassName("articles");

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  - ICI on fait apparaître les 5 derniers articles
  - et positionnement des articles aléatoire et application des couleurs
  -*-*-*-*-*-*-*-*-*-*-*-* */
  chargement_et_style_article();

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Lorsqu'on clique sur les articles, le ZINDEX change pour passer au premier plan
  -*-*-*-*-*-*-*-*-*-*-*-* */
  for (var i = 0; i < articles.length; i++) {
    articles[i].addEventListener("mousedown", zIndexChangement);
    articles[i].customIndex = i;
  }

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Les boutons croix et agrandir dans les articles
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var croix = document.getElementsByClassName("croix");
  var agrandir = document.getElementsByClassName("agrandir");
  for (var i = 0; i < croix.length; i++) {
    croix[i].addEventListener("click", closeWindow);
    croix[i].customIndex = i;
  }
  for (var i = 0; i < agrandir.length; i++) {
    agrandir[i].addEventListener("click", fullWindow);
    agrandir[i].customIndex = i;
  }

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Création du menu

  1 - les articles sont générés avec un titre qui contient la classe "titre" et la classe
  correspondant à la rubrique soit:

  <article>
  <div class="titres (politique || ressources || exebition || varia || tools)" id="Titre (identifiant)">
  (politique || ressources || exebition || varia || tools)
  </div>
  <contenu></contenu>
  </article>

  2 - Le menu, lui, à des boites nommées comme les rubriques.
  <menu>
  <boite politique></boite politique>
  <boite ressources></boite ressources>
  <etc.>
  </menu>

  3 - On va chercher tout les titres qui contiennent la classe "politique", et on les copie à l'intérieur
  de la boite politique, dans des nouvelles divs.

  <boite politique>
  <div class="titre_article_menu"> copie du titre d'un article</div>
  </boite politique>

  -*-*-*-*-*-*-*-*-*-*-*-* */
  for (var i = 0; i < titres.length; i++) {
    creationMenu(titres[i]);
  }

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Interaction sur les rubriques du menu - click, survol...
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var titres_rubriques = document.getElementsByClassName("titres_rubriques");
  for (var i = 0; i < titres_rubriques.length; i++) {
    titres_rubriques[i].addEventListener("mouseenter", montrer_titres);
    titres_rubriques[i].addEventListener("mouseout", cacher_titres);
    titres_rubriques[i].addEventListener("click", bloquer_titres);
  }

  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Fermer tout le menu MOBILE..
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var menu = document.getElementById("menu");
  menu.addEventListener("click", close_menu);
  var mobile_menu_button = document.getElementById("mobile_menu_button");
  mobile_menu_button.addEventListener("click", display_menu);
  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Ouvrir les articles correspondant au titre en cliquant sur les titres du menu
  -*-*-*-*-*-*-*-*-*-*-*-* */
  var titre_article_menu = document.getElementsByClassName("titre_article_menu");
  for (var i = 0; i < titre_article_menu.length; i++) {
    titre_article_menu[i].addEventListener("click", ouvrirArticle);
    titre_article_menu[i].customIndex=i;
  }
}

function display_menu(){
  menu.style.width =100+"vw";
}
function close_menu(evt) {
  console.log(evt.target.id);
  if(evt.target.id == "menu"){
    menu.style.width = 0;
    menu.style.overflow = hidden;
  }
}

function close_menu_sans_event_oups() {
  menu.style.width = 0;
  menu.style.overflow = hidden;
}

function creationMenu(titre){
  var menu = document.getElementById("menu");
  // création de la div copie du titre
  var titre_article_menu = document.createElement("div");
  titre_article_menu.classList = "titre_article_menu";
  titre_article_menu.innerHTML = titre.innerHTML
  // récupération des boites rubrique du menu
  var politique = document.getElementById("politique");
  var culture = document.getElementById("culture");
  var ressources = document.getElementById("ressources");
  var exebition = document.getElementById("exebition");
  var tools = document.getElementById("tools");
  var varia = document.getElementById("varia");
  // mettre nos nouvelles div dans les boites
  if(titre.classList[1].includes("politique")){
    politique.appendChild(titre_article_menu);
  }
  if(titre.classList[1].includes("culture")){
    culture.appendChild(titre_article_menu);
  }
  if(titre.classList[1].includes("ressources")){
    ressources.appendChild(titre_article_menu);
  }
  if(titre.classList[1].includes("exebition")){
    exebition.appendChild(titre_article_menu);
  }
  if(titre.classList[1].includes("tools")){
    tools.appendChild(titre_article_menu);
  }
  if(titre.classList[1].includes("varia")){
    varia.appendChild(titre_article_menu);
  }
}

function montrer_titres(e){
  active_title = e.target;
  active_title.style.backgroundColor = "white";
  const children = active_title.parentNode.children;
  var style = window.getComputedStyle(children[1], null).getPropertyValue("display");

  Array.from(children).forEach(div => {
    if(div.classList != "titres_rubriques" && div.classList != "titre_article_menu bloquee"){
      div.style.display = "block";
    }
  });
}
function cacher_titres(e){
  active_title = e.target;

  active_title.style.backgroundColor = "transparent";
  const children = active_title.parentNode.children;
  var style = window.getComputedStyle(children[1], null).getPropertyValue("display");

  Array.from(children).forEach(div => {
    if(div.classList != "titres_rubriques"&& div.classList != "titre_article_menu bloquee"){
      div.style.display = "none";
    }
  });

}
function bloquer_titres(e){
  active_title = e.target;
  const children = active_title.parentNode.children;
  var style = window.getComputedStyle(children[1], null).getPropertyValue("display");
  clickMenu = true;

  var titre_article_menu = document.getElementsByClassName("titre_article_menu");
  for (var i = 0; i < titre_article_menu.length; i++) {
    titre_article_menu[i].style.display = "none";
    titre_article_menu[i].classList = "titre_article_menu"
  }

  active_title.style.backgroundColor = "transparent";
  Array.from(children).forEach(div => {
    if(div.classList != "titres_rubriques"){
      div.style.display = "block";
      active_title.style.backgroundColor = "white";
      div.classList.add("bloquee");
    }
  });

}

function ouvrirArticle(e){
  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Récuperer le titre de l'article.
  Si le titre d'un article est égal au titre de la rubrique dans le menu,
  on récupere l'article correspondant et on l'affiche.
  Son Zindex devient le plus haut.
  -*-*-*-*-*-*-*-*-*-*-*-* */
  if(mobile){
    close_menu_sans_event_oups()
  }

  var titres = document.getElementsByClassName("titres");
  for (var i = 0; i < titres.length; i++) {
    if(titres[i].innerHTML.includes(e.target.innerHTML)){
      var style = window.getComputedStyle(titres[i].parentNode.parentNode, null);
      if(style.getPropertyValue("display") != "block"){
        const div = titres[i].parentNode.parentNode;
        for (var i = 0; i < articles.length; i++) {
          articles[i].style.zIndex = articles[i].style.zIndex - 1;
          if(articles[i].style.zIndex < 0){
            articles[i].style.display = "none";
          }
        }
        div.style.display = "block";
        div.style.zIndex = 4;
      }
    }
  }
}

function fullWindow(e){
  active_div = e.target;
  articles[active_div.customIndex].style.width = "80%";
  articles[active_div.customIndex].style.height = "80%";
  articles[active_div.customIndex].style.top = "20vh";
  articles[active_div.customIndex].style.left = "2vw";
  articles[active_div.customIndex].style.transform = "initial";
}

function closeWindow(e){
  active_div = e.target;
  articles[active_div.customIndex].style.display = "none";
}

function chargement_et_style_article(){

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

    if(mobile){
      console.log(mobile)
      articles[i].style.position = "relative";
      articles[i].style.width = 100 + "vw";
      articles[i].style.height = "auto";
      articles[i].style.top = 10 + "vh";
      articles[i].style.left = 0 + "vw";
    }
    if(ordinateur){
      document.body.style.overflow = "hidden";
      articles[i].style.width = getRandomFromTo(20, 30)+"vw";
      articles[i].style.height =  getRandomFromTo(20, 50)+"vw";

      articles[i].style.top = getRandomFromTo(20, 30)+"vh";
      articles[i].style.left =  getRandomFromTo(0, 50)+"vw";
    }


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

function zIndexChangement(e){
  /* -*-*-*-*-*-*-*-*-*-*-*-*
  Récupérer sur quel div on clique, et en fonction remonter au parent "article"
  -*-*-*-*-*-*-*-*-*-*-*-* */
  active_div = e.target;

  if (!active_div.classList.contains('articles')) {
    console.log(active_div)
    if(!active_div.parentNode.classList.contains('textes')){
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].style.zIndex > articles[active_div.parentNode.customIndex].style.zIndex){
          articles[i].style.zIndex = articles[i].style.zIndex - 1;
        }
      }
      articles[active_div.parentNode.customIndex].style.zIndex = compteurZindex;
    }else{
      for (var i = 0; i < articles.length; i++) {
        if (articles[i].style.zIndex > articles[active_div.parentNode.parentNode.customIndex].style.zIndex){
          articles[i].style.zIndex = articles[i].style.zIndex - 1;
        }
      }
      articles[active_div.parentNode.parentNode.customIndex].style.zIndex = compteurZindex;
    }
  } else {
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].style.zIndex > articles[active_div.customIndex].style.zIndex){
        articles[i].style.zIndex = articles[i].style.zIndex - 1;
      }
    }
    articles[active_div.customIndex].style.zIndex = compteurZindex;
  }
}

// posX=0;
// posY=0;
// velocityX = 0;
// velocityY = 0;
// array_postits = ["this is not POST-IT", "Sur cette page, il y a des FENÊTRES", "Say NO to POSTS-ITS", "ce ne sont pas des POSTS-ITS", "Dites NON aux POSTS-ITS"]
// function flying_NO(){
//
//   posX = posX + velocityX;
//   posY = posY + velocityY;
//
//   // left or right collision
//   if (posX <= 0) {
//     velocityX = getRandomFromTo(0,2);
//     say_no_to_post_it.innerHTML = GetRandomFromArray(array_postits);
//   }
//   if (posX > window.innerWidth - 100) {
//     velocityX -= getRandomFromTo(0,2);
//     say_no_to_post_it.innerHTML = GetRandomFromArray(array_postits);
//   }
//
//   if (posY <= 0) {
//     velocityY = getRandomFromTo(0,2);
//     say_no_to_post_it.innerHTML = GetRandomFromArray(array_postits);
//   }
//   if (posY > window.innerHeight - 50) {
//     velocityY -= getRandomFromTo(0,2);
//     say_no_to_post_it.innerHTML = GetRandomFromArray(array_postits);
//   }
//
//
//   say_no_to_post_it.style.top = posY + "px";
//   say_no_to_post_it.style.left = posX + "px";
//
//   requestAnimationFrame(flying_NO);
// }

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
