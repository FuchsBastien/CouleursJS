const fond = document.body;
const containerCouleurs = document.querySelector('.container-couleurs');
const inputsCouleur = document.querySelectorAll('.inp-couleur');
const btns = document.querySelectorAll('button');
const btnRandom = document.querySelector('.random');
const inputRange = document.querySelector('.inp-range');
const span = document.querySelector('span');



// Démarrage

let valCouleurs = ['#BA5370', '#F4E2D8'];
console.log(valCouleurs);
let inclinaison = 45;
/*index de départ pour rajout d'input*/
let index = 3;
//on choisit l'input 1 et la couleur 1 de valCouleurs
inputsCouleur[0].value = valCouleurs[0];
//on choisit l'input 2 et la couleur 2 de valCouleurs
inputsCouleur[1].value = valCouleurs[1];
inputsCouleur[0].style.background = valCouleurs[0];
inputsCouleur[1].style.background = valCouleurs[1];

//on choisit le style du fond avec l'inclinaison et les deux couleurs
fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;



// Inclinaison

inputRange.addEventListener('input', (e) => {
    //*3.6 = inclinaison à 360 degrès car la range fait 100*3.6 = 360
    inclinaison = e.target.value *3.6;
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;

})



// Rajout / Suppression

//Pour chaque click du bouton
btns.forEach(btn => {
    btn.addEventListener ('click', rajouteEnleve)
});

function rajouteEnleve(e){
    //quand on reclique cela enlève le message
    span.innerText = '';

    //on reprend le même que const inputsCouleur mais tous les inputs en plus des 2 de départ
    const allInputs = document.querySelectorAll('.inp-couleur');
    /*couleurs au hasard : math.floor = 5.6 donc 5 (entier en dessous d'un nombre à virgule)
    math.random = chiffre entre 0 et 1 toString = convertir en valeur hexadécimal* (A à F at 0 à 9 =
    16 valeurs chacune)*/
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //console.log(randomColor);

    //si c'est le bouton "plus"
    if (e.target.className === "plus"){
       
        /*si les inputs sont > 8 on stoppe la fonction*/
        if(allInputs.length > 8){
            return;
        }

       //on crée un nouvel input 
       nvCouleur  = document.createElement ('input')
       //qui est le nouvel enfant de containerCouleurs
       containerCouleurs.appendChild(nvCouleur);
       //qui prend la class inp-couleur
       nvCouleur.setAttribute('class', 'inp-couleur');
       //qui prend l'index de départ 3 (car 3ème input)
       nvCouleur.setAttribute('data-index', index);
       //qui prend maxlengh 7 caractères
       nvCouleur.setAttribute('maxlength', 7);
       //qui prend la valeur de randomColor avec les lettre en majuscule
       nvCouleur.value = `#${randomColor.toUpperCase()}`;
       //qui prend la valeur de randomColor pour le fond
       nvCouleur.style.background = `#${randomColor}`;

       //on rentre dans le tableau valCouleurs la nouvelle couleur aléatoire rajouté aux autres
       valCouleurs.push(`#${randomColor.toUpperCase()}`)

       //Mis à jour du fond
       fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
       //permet de rajouter un nouvel index au nouvel input
       index++;
    }
    else if (e.target.className === "moins"){
        if (valCouleurs.length ===2) {
            span.innerText = 'il faut au moins deux couleurs !'
        }
        else {
            // pop = enlève la dernière valeur du tableau valCouleurs
            valCouleurs.pop()
            //on diminue les inputs de 1
            allInputs[allInputs.length-1].remove();
            //Mis à jour du fond
            fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
            //permet d'enlever l'index de l'input supprimé
            index--;
        }
    }  

        // Mis à jour des inputs CREES
        //ATTENTION LE DERNIER INPUT CREE AVEC LE BOUTON + NE PEUT ETRE MODIFIE
        allInputs.forEach(inp => {
            //pour chaque input qu'on modifie on applique la fonction MAJCOLORS
            inp.addEventListener('input', MAJCOLORS);
        });

}

  

// Mis à jour des inputs DE BASE
inputsCouleur.forEach(inp => {
    inp.addEventListener('input', MAJCOLORS);
});


function MAJCOLORS(e){
    //on prend l'index de l'input qu'on est en train de changer
    let indexEnCours = e.target.getAttribute('data-index');
    //on met en majuscule la valeur qu'on saisit
    e.target.value = e.target.value.toUpperCase();
    /*on va chercher dans le tableau des couleurs l'index de l'input qu'on est en train de changer
    (-1 car commence à 0) et on l'associe à la valeur qu'on écrit*/
    valCouleurs[indexEnCours - 1] = e.target.value.toUpperCase();
    //on prend le background de ce qu'on saisit et on lui ajoute la valeur de ce qu'on a saisit
    e.target.style.background = valCouleurs[indexEnCours - 1];
    //on actualise le fond
    fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
}



// Couleurs aléatoires

btnRandom.addEventListener('click', () => {
    //on reprend les inputs
    const inputs = document.querySelectorAll('.inp-couleur');
    //on parcourt le tableau des couleurs
    for (i = 0 ; i < valCouleurs.length; i++) {
        //on prend pour chaque couleur dans le tableau une couleur au hasard avec la valeur de randomColor
        valCouleurs[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        //pour chaque input on associe cette nouvelle couleur au hasard
        inputs[i].value = valCouleurs[i].toUpperCase();
            //pour chaque input on met le background de la nouvelle couleur
        inputs[i].style.background = valCouleurs[i].toUpperCase();
            //pour le fond on met le background du tableau
        fond.style.background = `linear-gradient(${inclinaison}deg, ${valCouleurs})`;
        
    }

})





