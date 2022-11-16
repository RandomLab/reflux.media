
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
var posXbis;
var posYbis;
var departOK = false;



var ZoneDeDragWidth = window.innerWidth  - 370; 
var ZoneDeDragHeight = window.innerHeight -(window.innerHeight -30);
var reFluxImg = [ "1.gif", "2.gif", "3.gif", "4.gif","5.gif","6.gif"];


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
  //----------------------------- Quatriéme étape: Les fenêtres sont cliquables et elles passent au premier plan
  for (var i = 0; i < fenetres.length; i++) {
    fenetres[i].addEventListener("click", premierPlan);
    fenetres[i].customIndex = i;
  }
 // reFlux();
 // backGround();
	menu();


}


//----------------------------- LES FONCTIONS ICI !
function creationFenetre(titre, texte){
  compteurZindex++;
  var tableauCouleurs = ["rgb( 75, 255, 64 )","rgb(5, 106, 54)","rgb( 2, 53, 21 )","rgb( 23, 0, 90 )","rgb( 143, 0, 255 )"];
  var couleur = GetRandomFromArray(tableauCouleurs);
  console.log(tableauCouleurs , couleur);
  // Création de la createFenetre
  var createFenetre = document.createElement("div");
  createFenetre.classList = "fenetre";
  createFenetre.style.top = getRandomFromTo(10, 40)+"vh";
  createFenetre.style.left =  getRandomFromTo(0, 30)+"vw";
  //createFenetre.style.boxShadow =  "-10px 10px 4px 1px " + couleur;
  createFenetre.style.borderTop = "dashed " + couleur;
  createFenetre.style.borderLeft = "3px solid " + couleur;
  createFenetre.style.borderRight = "3px solid " + couleur;
  //createFenetre.style.border = couleur;
  createFenetre.style.borderRadius = 5 +"px";
  createFenetre.style.zIndex = compteurZindex;
  document.body.appendChild(createFenetre)
  createFenetre.appendChild(titre)
  createFenetre.appendChild(texte)
  //fenetres = document.getElementsByClassName("fenetre");
  //var TailleFenetre = fenetres[0].style.width;

}

  function reFlux (){
	var reflux = document.createElement('img');
	var titre = GetRandomFromArray(reFluxImg);
	reflux.src = "test/" + titre ;
	reflux.alt = "yolerandom";
	reflux.classList = "tiitre";
	document.body.appendChild(reflux);
	}
	
	
	//why repeat marche pas?
//function backGround(){
//document.body.style.backgroundImage = reFlux();
//document.html.style.backgroundRepeat = "repeat";
//}
//var categories = 
//function menu (){};

function menu(){
	categories = document.getElementsByClassName("categories");

}


function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function departDuDrag(e){
  fenetres = document.getElementsByClassName("fenetre");
  departOK = true;
  activeDiv = e.target;
  posX = e.clientX - fenetres[activeDiv.customIndex].getBoundingClientRect().left;
  posXbis = e.clientX - fenetres[activeDiv.customIndex].getBoundingClientRect().right;
  posY = e.clientY - fenetres[activeDiv.customIndex].getBoundingClientRect().top;
  posYbis = e.clientY - fenetres[activeDiv.customIndex].getBoundingClientRect().bottom;
}

function moveAt(pageX, pageY){
  if(departOK && pageX - posXbis < ZoneDeDragWidth && pageY - posY > ZoneDeDragHeight) {
    fenetres[activeDiv.customIndex].style.left = pageX - posX + 'px';
    fenetres[activeDiv.customIndex].style.top = pageY - posY + 'px';
  }
}
//pageX - posX < ZoneDeDragWidth && pageY - posY < ZoneDeDragWidth && 

function finDuMouvement(){
  departOK = false;
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
//Le menu


var categorie = document.getElementsByClassName('categories');
var liste = document.getElementsByClassName('listes');
var tableauCategorie = [];
var tableauListe = [];
var ouverte;

for (i = 0; i < categorie.length; i++)
{
	tableauCategorie.push(document.getElementById('categorie' + i));
}
for (i = 0; i < liste.length; i++)
{
	tableauListe.push(document.getElementById('liste' + i));
}

var menu = [tableauCategorie[i], tableauListe[i]];


for (i = 0; i < categorie.length; i++)
{
	tableauCategorie[i].addEventListener("click",ouvreFerme);
	tableauCategorie[i].customIndex = i;
}

function ouvreFerme(event){
ouverte= event.target;
var comment = window.getComputedStyle(tableauListe[ouverte.customIndex]);
console.log(comment.display);


if (comment.display == "none"){
	tableauListe[ouverte.customIndex].style.display = "block";
	}
else if (comment.display == "block"){
	tableauListe[ouverte.customIndex].style.display = "none";
		}
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
