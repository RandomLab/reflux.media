window.addEventListener("load", laPageEstChargee);

function laPageEstChargee(){

  // 1 - créer 1 div de formes carrées
  for(i=0; i<5; i++){
    var bob = document.createElement("div");
    bob.classList = "bob";
    bob.style.width = i + "%";
    document.body.appendChild(bob);
  }

  // récuperer les divs qui ont été créées
  var lesBobs = document.getElementsByClassName('bob');

  // Toutes les divs ont un écouteur d'évènement "click"
  for(i=0; i<lesBobs.length; i++){
    lesBobs[i].addEventListener("click", jeclique);
    lesBobs[i].customIndex = i;
  }

  // 2 - quand je clique sur un carré, il change de couleur
  function jeclique(event){
    var laDivActive = event.target;
    var computedStyle =  window.getComputedStyle(lesBobs[laDivActive.customIndex])
    console.log(computedStyle.backgroundColor)

    if(computedStyle.backgroundColor == "rgb(0, 0, 255)"){
      lesBobs[laDivActive.customIndex].style.backgroundColor = "fuchsia";
    }else if(computedStyle.backgroundColor == "rgb(255, 0, 255)"){
      lesBobs[laDivActive.customIndex].style.backgroundColor = "blue";
    }
  }
}
