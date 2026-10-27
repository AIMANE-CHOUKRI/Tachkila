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

function validerNom(nom) {
    const regex = /^[a-zA-ZÀ-ÿ\s]{3,30}$/;
    return regex.test(nom.trim());
}

function validerNumero(num) {
    const n = parseInt(num);
    if (isNaN(n) || n < 1 || n > 99) return false;
    for (let i = 0; i < joueurs.length; i++) {
        if (joueurs[i].numero === n && joueurs[i].id !== idEnModification) {
            return false;
        }
    }
    return true;
}

function postePertesCompatibilite(poste, targetPos) {
    if (poste === 'gardien' && targetPos === 'gb') return true;
    if (poste === 'defenseur' && ['dg', 'dc1', 'dc2', 'dd'].includes(targetPos)) return true;
    if (poste === 'milieu' && ['mg', 'mc1', 'mc2', 'md'].includes(targetPos)) return true;
    if (poste === 'attaquant' && ['bu1', 'bu2'].includes(targetPos)) return true;
    return false;
}

function mettreAJourTerrain() {
    const slots = document.querySelectorAll('.slot, .keeper');
    for (let i = 0; i < slots.length; i++) {
        const posCode = slots[i].getAttribute('data-position');
        let joueurTrouve = null;

        for (let j = 0; j < joueurs.length; j++) {
            if (joueurs[j].position === posCode) {
                joueurTrouve = joueurs[j];
                break;
            }
        }

        if (joueurTrouve) {
            slots[i].textContent = joueurTrouve.numero + ' - ' + joueurTrouve.nom;
        } else {
            slots[i].textContent = posCode.toUpperCase();
        }
    }
}

function afficherJoueurs() {
    listeJoueurs.innerHTML = '';
    let countPlaces = 0;

    for (let i = 0; i < joueurs.length; i++) {
        const j = joueurs[i];
        if (j.position && j.position !== 'banc') {
            countPlaces++;
        }

        const li = document.createElement('li');
        li.className = 'bg-blue-950 p-4 rounded-lg text-white';
        if (j.position && j.position !== 'banc') {
            li.style.opacity = '0.5';
        }

        li.innerHTML = `
            <div class="flex justify-between items-center text-white">
                <h2 class="bg-cyan-500 p-2 rounded-full font-bold">${j.numero}</h2>
                <span>
                    <h3>${j.nom}</h3>
                    <h4>${j.poste}</h4>
                </span>
                <span>
                    <button class="btnEdit">&#9999;</button>
                    <button class="btnDelete">&#128465;</button>
                </span>
            </div>
            <select class="selectPoste w-full mt-2 text-black p-1 rounded">
                <option value="banc" ${j.position === 'banc' ? 'selected' : ''}>Sur le banc</option>
                ${j.poste === 'gardien' ? `<option value="gb" ${j.position === 'gb' ? 'selected' : ''}>GB - Gardien</option>` : ''}
                ${j.poste === 'defenseur' ? `
                    <option value="dg" ${j.position === 'dg' ? 'selected' : ''}>DG - Défenseur gauche</option>
                    <option value="dc1" ${j.position === 'dc1' ? 'selected' : ''}>DC - Central 1</option>
                    <option value="dc2" ${j.position === 'dc2' ? 'selected' : ''}>DC - Central 2</option>
                    <option value="dd" ${j.position === 'dd' ? 'selected' : ''}>DD - Défenseur droit</option>
                ` : ''}
                ${j.poste === 'milieu' ? `
                    <option value="mg" ${j.position === 'mg' ? 'selected' : ''}>MG - Milieu gauche</option>
                    <option value="mc1" ${j.position === 'mc1' ? 'selected' : ''}>MC - Central 1</option>
                    <option value="mc2" ${j.position === 'mc2' ? 'selected' : ''}>MC - Central 2</option>
                    <option value="md" ${j.position === 'md' ? 'selected' : ''}>MD - Milieu droit</option>
                ` : ''}
                ${j.poste === 'attaquant' ? `
                    <option value="bu1" ${j.position === 'bu1' ? 'selected' : ''}>BU - Buteur 1</option>
                    <option value="bu2" ${j.position === 'bu2' ? 'selected' : ''}>BU - Buteur 2</option>
                ` : ''}
            </select>
        `;

        const btnEdit = li.querySelector('.btnEdit');
        btnEdit.addEventListener('click', () => {
            idEnModification = j.id;
            inputNom.value = j.nom;
            inputNum.value = j.numero;
            for (let r = 0; r < inputRadio.length; r++) {
                inputRadio[r].checked = (inputRadio[r].value === j.poste);
            }
            if (h1Ajout) h1Ajout.textContent = "Modifier le joueur";
            if (btnValider) btnValider.textContent = "Modifier";
            dialog.showPopover();
        });

        const btnDelete = li.querySelector('.btnDelete');
        btnDelete.addEventListener('click', () => {
            if (confirm("Supprimer ce joueur ?")) {
                joueurs.splice(i, 1);
                sauvegarder();
                afficherMessage("Joueur supprimé");
            }
        });

        const selectPoste = li.querySelector('.selectPoste');
        selectPoste.addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'banc') {
                j.position = 'banc';
                sauvegarder();
                afficherMessage("Joueur remis sur le banc");
            } else {
                let occupe = false;
                for (let k = 0; k < joueurs.length; k++) {
                    if (joueurs[k].position === val && joueurs[k].id !== j.id) {
                        occupe = true;
                        break;
                    }
                }
                if (occupe) {
                    afficherMessage("Cette position est occupée !", true);
                    selectPoste.value = j.position || 'banc';
                } else {
                    j.position = val;
                    sauvegarder();
                    afficherMessage("Joueur placé !");
                }
            }
        });

        listeJoueurs.appendChild(li);
    }

    if (nbJoueurs) nbJoueurs.textContent = joueurs.length;
    if (nbPlaces) nbPlaces.textContent = countPlaces;
    mettreAJourTerrain();
}

function sauvegarder() {
    localStorage.setItem('joueurs', JSON.stringify(joueurs));
    afficherJoueurs();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const valueNom = inputNom.value.trim();
        const valueNum = parseInt(inputNum.value.trim());
        let checkedRadio = "";

        for (let i = 0; i < inputRadio.length; i++) {
            if (inputRadio[i].checked) {
                checkedRadio = inputRadio[i].value;
            }
        }

        if (!validerNom(valueNom)) {
            afficherMessage("Nom invalide (3-30 lettres).", true);
            return;
        }

        if (!validerNumero(valueNum)) {
            afficherMessage("Numéro invalide ou déjà pris.", true);
            return;
        }

        if (!checkedRadio) {
            afficherMessage("Sélectionnez un poste.", true);
            return;
        }

        if (idEnModification !== null) {
            for (let i = 0; i < joueurs.length; i++) {
                if (joueurs[i].id === idEnModification) {
                    joueurs[i].nom = valueNom;
                    joueurs[i].numero = valueNum;
                    if (joueurs[i].poste !== checkedRadio) {
                        joueurs[i].poste = checkedRadio;
                        joueurs[i].position = 'banc';
                    }
                    break;
                }
            }
            afficherMessage("Joueur modifié avec succès");
        } else {
            const nouveauJoueur = {
                id: Date.now(),
                nom: valueNom,
                numero: valueNum,
                poste: checkedRadio,
                position: 'banc'
            };
            joueurs.push(nouveauJoueur);
            afficherMessage("Joueur ajouté avec succès");
        }

        dialog.hidePopover();
        reinitialiserFormulaire();
        sauvegarder();
    });

    afficherJoueurs();
});
