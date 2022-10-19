window.addEventListener("load", setup);

var compteurZindex = 0;
var couleurs = ["red", "fuchsia", "grey", "yellow"]
var titre = ["Titre 1", "Titre 2", "Titre 3", "Titre 4", "Titre 5"]
var texte = ["texte 1", "texte 2", "texte 3", "texte 4", "texte 5"]
var fenetres = document.getElementsByClassName("fenetre");
var activeDiv;
var posX;
var posY;
var departOK = false;

function setup() {

  for (var i = 0; i < 5; i++) {
    creationFenetre(titre[i],texte[i]);
  }

  document.addEventListener("mousemove", onMouseMove);

  for (var i = 0; i < fenetres.length; i++) {
    fenetres[i].addEventListener("mousedown", departDuDrag);
    fenetres[i].addEventListener("mouseup", finDuMouvement);
    fenetres[i].customIndex = i;
  }
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

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);
}

function departDuDrag(e){
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
