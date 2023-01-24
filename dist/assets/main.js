
//----------------------------- Stockage des variables externes ici
var compteurZindex = 3;

var activeDiv;
var active_title;

var posX;
var posY;

var departOK = false;
var clickMenu = false;

var articles;
var tableauCouleurs = ["mediumslateblue", "magenta", "paleturquoise", "lime", "aquamarine", "lavender"]


window.addEventListener("load", setup);

function setup() {

  interact('.articles')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute('data-x')) || 0)
        var y = (parseFloat(target.getAttribute('data-y')) || 0)

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent
      interact.modifiers.restrictEdges({
        outer: 'parent'
      }),

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {

      }
    }
  })

  function dragMoveListener (event) {
    var target = event.target
    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  // this function is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener

  //----------------------------- Récuperer les titres et les textes dans le HTML
  var titres = document.getElementsByClassName("titres");
  var textes = document.getElementsByClassName("textes");

  var titres_rubriques = document.getElementsByClassName("titres_rubriques");

  articles = document.getElementsByClassName("articles");

  //----------------------------- Faire apparaître les 5 derniers articles
  // Positionnement des articles aléatoire et application des couleurs
  modifyArticles();

  //----------------------------- DRAG N DROP sur les fenêtres
  // document.addEventListener("mousemove", onMouseMove);
  // for (var i = 0; i < articles.length; i++) {
  //   articles[i].addEventListener("mousedown", departDuDrag);
  //   articles[i].addEventListener("mouseup", finDuMouvement);
  //   articles[i].customIndex = i;
  // }

  for (var i = 0; i < articles.length; i++) {
    articles[i].addEventListener("mousedown", zIndexChangement);
    articles[i].customIndex = i;
  }


  var croix = document.getElementsByClassName("croix");
  for (var i = 0; i < croix.length; i++) {
    croix[i].addEventListener("click", closeWindow);
    croix[i].customIndex = i;
  }

  //----------------------------- Création du menu
  for (var i = 0; i < titres.length; i++) {
    creationMenu(titres[i]);
  }
  //Déployer les titres des articles au survol sur le titre du menu
  var titres_rubriques = document.getElementsByClassName("titres_rubriques");
  for (var i = 0; i < titres_rubriques.length; i++) {
    titres_rubriques[i].addEventListener("mouseenter", montrer_titres);
    titres_rubriques[i].addEventListener("mouseout", cacher_titres);
    titres_rubriques[i].addEventListener("click", bloquer_titres);
  }
  //Ouvrir les articles en cliquant sur les titres du menu
  var titre_article_menu = document.getElementsByClassName("titre_article_menu");
  for (var i = 0; i < titre_article_menu.length; i++) {
    titre_article_menu[i].addEventListener("click", ouvrirArticle);
  }

}

function creationMenu(titre){

  var menu = document.getElementById("menu");
  var titre_article_menu = document.createElement("div");
  titre_article_menu.classList = "titre_article_menu";
  titre_article_menu.innerHTML = titre.innerHTML

  var politique = document.getElementById("politique");
  var culture = document.getElementById("culture");
  var ressources = document.getElementById("ressources");
  var exebition = document.getElementById("exebition");
  var tools = document.getElementById("tools");
  var varia = document.getElementById("varia");

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
  active_title.style.backgroundColor = "black";
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
    console.log(div)
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
      active_title.style.backgroundColor = "black";
      div.classList.add("bloquee");
    }
  });

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

function zIndexChangement(e){
  activeDiv = e.target;
  for (var i = 0; i < articles.length; i++) {
    if (articles[i].style.zIndex > articles[activeDiv.customIndex].style.zIndex){
      articles[i].style.zIndex = articles[i].style.zIndex - 1;
    }
  }
  articles[activeDiv.customIndex].style.zIndex = compteurZindex;
}
//
// function departDuDrag(e){
//   departOK = true;
//   activeDiv = e.target;
//   posX = e.clientX - articles[activeDiv.customIndex].getBoundingClientRect().left;
//   posY = e.clientY - articles[activeDiv.customIndex].getBoundingClientRect().top;
//   for (var i = 0; i < articles.length; i++) {
//     if (articles[i].style.zIndex > articles[activeDiv.customIndex].style.zIndex){
//       articles[i].style.zIndex = articles[i].style.zIndex - 1;
//     }
//   }
//   articles[activeDiv.customIndex].style.zIndex = compteurZindex;
// }
//
// function moveAt(pageX, pageY){
//   if(departOK){
//     articles[activeDiv.customIndex].style.left = pageX - posX + 'px';
//     articles[activeDiv.customIndex].style.top = pageY - posY + 'px';
//   }
// }
//
// function finDuMouvement(){
//   departOK = false;
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
