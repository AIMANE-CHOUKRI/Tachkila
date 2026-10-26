// // function ajouterJoueur(){
// //     const form = document.querySelector(".formAjout");
// //     const nom = form.querySelector("#nom");
// //     console.log(form);
// //     console.log(nom);
// // }
// const btnSubmit = document.querySelector("button[type='submit']")
// btnSubmit.addEventListener("submit", function(e){
//     e.preventDefault();
//     const form = document.querySelector(".formAjout");
//     // const nom = form.querySelector("#nom");
//     // // if (nom.textContent){
//     //     console.log(nom.textContent);
//     // }
//     const nom = form.querySelector("#nom");
//     const numero = form.querySelector("#numero");
//     // const nom = form.querySelector("#nom");
//     console.log(nom);
//     console.log(numero);
// })
// // console.log(ajouterJoueur())
const form = document.querySelector('.formAjout');
const inputNom = document.getElementById('nom');
const inputNum = document.getElementById('numero');
const inputRadio = document.querySelectorAll("input[name='poste']");
const listeJoueurs = document.getElementById('listeJoueurs');
const dialog = document.getElementById('dialogAjout');

let joueurs = [];

function ajouterJoueur(){}

const btnAnnuler = document.getElementById("btnAnnuler");
btnAnnuler.addEventListener('click', (e)=>{
    e.preventDefault();
    dialog.hidePopover();
    form.reset();
})

document.addEventListener('DOMContentLoaded', ()=>{
    if (!form) return;

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        let nomValid = true;
        let numValid = true;
        let radioValid = false;

        const valueNom = inputNom.value.trim();
        if (valueNom === '' || valueNom.length < 2){
            nomValid = false;
            console.error(valueNom, 'Le nom complet doit contenir au moins 2 caractères.');
        } else {
            console.error(valueNom, 'Le nom complet est valid.');
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
                const target = e.target; 
                const pTarget = target.parentNode;
                const gpTarget = pTarget.parentNode;
                const gppTarget = gpTarget.parentNode;
                const gpppTarget = gppTarget.parentNode;
                gpppTarget.removeChild(gppTarget);
                e.preventDefault();
            })
            
            return joueurs;

        } else {
            console.error("Remplissez toutes les cases avant l'envoi!")
        }


})}) 
