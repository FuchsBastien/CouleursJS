const inputsCouleur = document.querySelectorAll('.inp-couleur');
const fond = document.body;
const inputRange = document.querySelector('.inp-range');
const btns = document.querySelectorAll('button');


// Démarrage

let valCouleurs = ['#BA5370', '#F4E2D8'];
let inclinaison = 45;
let index = 3;
//on choisit l'input 1 et la couleur 1 de valCouleurs
inputsCouleur[0].value = valCouleurs[0];
//on choisit l'input 2 et la couleur 2 de valCouleurs
inputsCouleur[1].value = valCouleurs[1];
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

//on choisit le style du fond avec l'inclinaison et les deux couleurs
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;



