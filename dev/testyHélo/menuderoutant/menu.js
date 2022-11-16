
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



