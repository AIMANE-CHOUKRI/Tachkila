const form = document.querySelector('.formAjout');
const inputNom = document.getElementById('nom');
const inputNum = document.getElementById('numero');
const inputRadio = document.querySelectorAll("input[name='poste']");
const listeJoueurs = document.getElementById('listeJoueurs');
const dialog = document.getElementById('dialogAjout');
const h1Ajout = document.getElementById('h1Ajout');
const btnValider = document.getElementById('btnValider');
const btnOuvrir = document.getElementById('btnOuvrir');
const btnAnnuler = document.getElementById('btnAnnuler');
const btnFermer = document.getElementById('btnFermer');
const nbJoueurs = document.getElementById('nbJoueurs');
const nbPlaces = document.getElementById('nbPlaces');
const message = document.getElementById('message');

let idEnModification = null;
let timerMessage;

let joueurs = JSON.parse(localStorage.getItem('joueurs')) || [];

function afficherMessage(txt, error = false) {
    clearTimeout(timerMessage);
    message.textContent = txt;
    message.style.backgroundColor = error ? 'red' : 'green';
    message.classList.remove('hidden');
    timerMessage = setTimeout(() => {
        message.classList.add('hidden');
    }, 3000);
}

function reinitialiserFormulaire() {
    form.reset();
    idEnModification = null;
    if (h1Ajout) h1Ajout.textContent = "Ajouter un joueur";
    if (btnValider) btnValider.textContent = "Ajouter";
}

if (btnAnnuler) {
    btnAnnuler.addEventListener('click', (e) => {
        e.preventDefault();
        dialog.hidePopover();
        reinitialiserFormulaire();
    });
}

        const valueNom = inputNom.value.trim();
        if (valueNom === '' || valueNom.length < 2){
            nomValid = false;
            console.error(valueNom, 'Le nom complet doit contenir au moins 2 caractères.');
        } else {
            console.error(valueNom, 'Le nom complet est valid.');
if (btnFermer) {
    btnFermer.addEventListener('click', () => {
        dialog.hidePopover();
        reinitialiserFormulaire();
    });
}

if (btnOuvrir) {
    btnOuvrir.addEventListener('click', () => {
        reinitialiserFormulaire();
    });
}

form.addEventListener('click', (e) => {
    e.stopPropagation();
});

        }
        console.log("nomValid : ", nomValid);

        const valueNum = inputNum.value.trim();
        if (valueNum === '' || valueNum < 1 || valueNum > 99){
            numValid = false;
            console.error(valueNum, 'Le numéro doit être entre 1 et 99.');
        } else {
            console.error(valueNum, 'Le numéro est valid.');
        }
        console.log("numValid : ", numValid);

        let checkedRadio = "";
        // const valueRadio = inputRadio.value.trim();
        // for (i=0; i<inputRadio.length; i++){
        //     if(!inputRadio[i].checked){
        //         radioValid = false;
        //     } else if (inputRadio[i].checked){
        //         radioValid = true;
        //         checkedRadio = inputRadio[i].value;
        //     }
        // } 
        // if (radioValid = false){
        //     console.error("No radio is checked.");
        // } else if (radioValid = true){
        
        // }
        // if (!inputRadio){
        //     radioValid = false;
        //     console.error("No radio is checked.");
        // } else {
        for (let i=0; i<inputRadio.length ; i++){
            if(inputRadio[i].checked){
                checkedRadio = inputRadio[i].value;
                radioValid = true;
            }
        }
        if (checkedRadio == ""){
            radioValid = false;
            console.error("No radio is checked.");
        }
        // }
        console.error("checkedRadio", checkedRadio);
        console.log("radioValid : ", radioValid);

        if(nomValid && numValid && radioValid){
            let newJoueur = [];
            newJoueur.push(valueNum, valueNom, checkedRadio);
            // console.table(newJoueur);

            form.reset();
            dialog.hidePopover();

            const joueur = `<li class="bg-blue-950 p-4">
                    <div class="flex justify-between items-center text-white">
                        <h2 class="bg-cyan-500 p-2 rounded-full">${valueNum}</h2><span><h3>${valueNom}</h3><h4>${checkedRadio}</h4></span><span><button id="btnModifier">&#9999;</button><button id="btnSupprimer">&#128465;</button></span>
                    </div>
                    <select name="poste" id="poste" class="w-full mt-2">
                        <option value="banc">Sur le banc</option>
                        <option value="gb">GB - Gardien</option>
                        <option value="dg">DG - Défenseur gauche</option>
                        <option value="dc1">DC - Défenseur central 1</option>
                        <option value="dc2">DC - Défenseur central 2</option>
                        <option value="dd">DD - Défenseur droit</option>
                        <option value="mg">MG - Milieu gauche</option>
                        <option value="mc1">MC - Milieu central 1</option>
                        <option value="mc2">MC - Milieu central 2</option>
                        <option value="md">MD - Milieu droit</option>
                        <option value="bu1">BU - Buteur 1</option>
                        <option value="bu2">BU - Buteur 2</option>
                    </select>
                </li>`;

            listeJoueurs.insertAdjacentHTML('afterbegin', joueur);

            joueurs.push(newJoueur);
            console.table(joueurs);

            const btnSupprimer = document.getElementById("btnSupprimer");
                
            btnSupprimer.addEventListener("click", (e)=>{
                const index=joueurs.indexOf(newJoueur);
                joueurs.splice(index,1);
                const target = e.target; 
                const pTarget = target.parentNode;
                const gpTarget = pTarget.parentNode;
                const ggpTarget = gpTarget.parentNode;
                const gggpTarget = ggpTarget.parentNode;
                gggpTarget.removeChild(ggpTarget);
                e.preventDefault();
            })
            
            return joueurs;

        } else {
            console.error("Remplissez toutes les cases avant l'envoi!")
        }


})}) 
