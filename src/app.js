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

document.addEventListener('DOMContentLoaded', ()=>{
    const form = document.querySelector('.formAjout');
    const inputNom = document.getElementById('nom');
    const inputNum = document.getElementById('numero');
    const dialog = document.getElementById('dialogAjout');

    if (!form) return;

    form .addEventListener('submit', (e)=>{
        e.preventDefault();
        let nomValid = true;
        let numValid = true;

        const valueNom = inputNom.value.trim();
        if (valueNom === '' || valueNom.length < 2){
            nomValid = false;
            console.error(inputNom, valueNom, 'Le nom complet doit contenir au moins 2 caractères.');
        } else {
            console.error(inputNom);
        }
        console.log(nomValid);
    })
})
